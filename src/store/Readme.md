# Store

`SPA`의 중앙 데이터 저장소 역할을 합니다.
Vuex의 자세한 내용은 https://vuex.vuejs.org/kr/ 에서 확인할 수 있습니다.

Store는 어플리케이션 전반에 걸쳐 1개만 존재하는 것이 일반적인 구성입니다.
일반적인 상황에서 API는 URL Context에 따라 여러 domain으로 나눌 수 있으므로, 
보통 module이라는 개념으로 각각의 domain을 나눕니다. 

이 템플릿 예시에서는 `/src/store/modules` 가 있고, 이 디렉토리 하위에 `example`이라는 domain이 존재한다고 가정했습니다. 
예시는 setTimeout을 사용했지만 실제로는 `/api/v1/example`라는 URL Context의 API를 호출하는 module라고 생각할 수 있습니다.

Store는 보통 Store를 정의하는 `/src/store/index.js`와 하위 모듈 디렉토리인 `/src/store/modules`,
그리고 그 하위 모듈의 구현체로 구성되어 있습니다. 이 구현체는 크게 api / action / getter / mutation / index(state)로 구성됩니다.

## API

실제로 서버와 통신한 구문을 정의합니다. 오직 이 파일에서만 `axios` 인스턴스를 생성하여 API 질의를 시도합니다.
`axios`는 Promise를 구현하고 있기 때문에 `request`, `get`, `post` 등의 함수 실행의 반환값은 반드시 Promise 인스턴스 입니다.

`axios`의 상세한 스팩은 아래 링크를 참고하세요.

https://www.npmjs.com/package/axios

```javascript
import axios from 'axios'

const announceInstance = create({
   baseURL,
   timeout: 10000, // 10s
   headers: {
     'Content-Type': 'application/json',
     'Accept': 'application/json'
   }
 }) 

export function announceBannerAPI () {
  // This api will invoke 
  return announceInstance.get(`/announces`)
}
```

API 파일에서 export 한 함수는 `action`에서 사용하게 됩니다.

## Action

page에서 store로 어떤 행동(여기서는 API 호출)을 요청하는 방법이 `action` 입니다.
`action`은 page로부터 "이 행동을 수행해달라"는 메시지를 받아서 이를 처리하고 그 결과를 store에 저장하거나 페이지에게 결과를 반환하는 컨트롤러 역할을 합니다. 

따라서, 가능하면 page가 store의 값을 변경하는 동작은 꼭 `action`을 통해서만 수행하는 것이 좋습니다.

`action`은 page가 자신을 호출할 수 있도록 어떤 행동이 정의된 함수를 반환합니다.
page가 필요한 param과 함께 이 함수를 실행하면, `action`은 API 호출을 실행하고, 성공/실패에 따라 mutation을 통해 store를 업데이트하는 등 일련의 transactional flow를 제어하게 됩니다.

```javascript
import * as t from './types'
import { getExamplesAPI } from './api'

export default {
  // you can access 'commit', 'getStates', etc through param of action.
  // It is provided from Vuex by default
  getExamples ({ commit }) {
    return getExamplesAPI() // invoke API
      .then((examples) => {
        // invoke mutation with type and value(payload)
        return commit(t.GET_EXAMPLES, { examples })
      })
      .catch(err => {
        throw err
      })
  }
}
```
 
## Type and Mutation

`action`은 `commit` 이라는 함수를 통해서 mutation과 통신합니다. 
오직 mutation만이 store의 값을 수정할 권한을 가지고 있기 때문에 `action`은 mutation에게 어떤 변경을 실행할 것인지 정보를 제공해야 합니다.

어떤 변경인지 묘사한 것이 type이며, 이를 `commit`이라는 함수의 param으로 mutation에게 전달합니다.
물론, 어떤 경우 type과 함께 업데이트할 때 사용할 값(payload)를 함께 전달해야 합니다. 

Mutation은 아래 예시처럼, type에 따른 store 갱신만 담당하는 worker 입니다.
type을 key로 하여 해당 type에 대해 미리 정의된 동작(함수)를 실행할 뿐 입니다.

```javascript
import * as t from './types'

export default {
  [t.GET_EXAMPLES]: (state, { examples }) => {
    state.examples = examples
  }
}
```

Mutation 작성 시 주의할 점은, 변경 사항의 전파입니다. 
위 예시의 `state.example`라는 값은 Vuex에서 이야기하는 반응성(Reactivity)를 가지고 있습니다.
쉽게 이야기해서 값이 변경되면 이를 참조하는 대상(이 예시에서는 page)에게 변경 사항을 전파한다는 의미입니다.

이 반응성은 `java`의 객체 비교와 유사하게 동작합니다. 
즉, 반응성을 가지 `state.examples`가 갱신을 전파하려면 이 값이 완전히 새로운 객체로 업데이트 되어야 한다는 의미입니다.

만약, 배열의 일부를 업데이트하는 과정에서 아래와 같은 방식을 사용하면 갱신이 정상적으로 전파되지 않을 가능성이 높습니다.

```javascript
import * as t from './types'

export default {
  [t.UPDATE_EXAMPLES_ITEM]: (state, { example }) => {
    const idx = example.id
    const targetIndex = state.examples.findIndex(item => item.id === idx)
    
    if (targetIndex > 0) {
      const item = state.examples[targetIndex]
      
      item.name = example.name
    }
  }
}
```

위 예시에서 `state.examples`를 기존 객체로 유지하면서 하위 객체의 일부 속성만 변경했습니다. 
Vuex는 반응성을 가진 `state.examples`가 이전 객체와 동일한 객체이므로, 변경 사항이 있다고 판단하지 않습니다.
언제나 안전하게 아래와 같이 업데이트 하는 것이 좋습니다.

```javascript
import * as t from './types'

export default {
  [t.UPDATE_EXAMPLES_ITEM]: (state, { example }) => {
    const idOfInterest = example.id
    
    // function map always return new array
    state.examples = state.examples.map(item => {
      // spread syntax is same as a shallow copy
      if (item.id === idOfInterest) {
        return {
          ...item,
          ...example
        }
      } else {
        return {
          ...item
        }
      }
      
    })
  }
}
```

위 예시에서 `state.examples`는 `map` 함수를 통해 새로운 배열로 업데이트 되었으며,
동시에 하위 객체도 shallow copy를 통해 모두 새로운 객체로 업데이트 되었습니다.
이렇게 매번 새로운 객체로 업데이트해야 Vuex의 reactivity를 유지할 수 있습니다.

## etc

`getters.js`는 주로 계산된 혹은 전처리된 값을 page에 제공할 때 사용합니다. 
VueJS의 `data`와 `computed` 관계와 유사합니다. 
`getter`를 과다하게 사용할 경우, 비즈니스 로직이 store에 구현되는 안티패턴이 발생하므로,
반복적인 formatting 수준의 형 변형 정도만 getter로 정의하여 사용하세요.

`index.js`는 api/actions/mutation/getter 등을 등록하고 초기 state를 정의하는 파일입니다.

## vuex-router-sync
Store에서 router값을 조회할 수 있습니다.
store.state.route.path   // current path (string)
store.state.route.params // current params (object)
store.state.route.query  // current query (object)
