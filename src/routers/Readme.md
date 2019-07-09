# Router

`SPA`를 위한 URL 네비게이션을 담당해주는 모듈입니다.
상세한 내용은 https://router.vuejs.org를 참고하시기 바랍니다.

## Pre-acquisition

`SPA`를 제공하는 웹서버는 일부 특별한 목적을 위한 static page를 제외한 모든 path 요청에 대해서 `index.html`을 반환하도록 구성되어야 합니다.

```javascript
// NodeJS의 예시
// app.js
import indexRouter from './router/index'

app.use(indexRouter)

// /router/index.js
import express from 'express'

const router = express.Router()

// NodeJS를 이용하는 경우 `index.html`은 사용할 수 없고 `index.ejs` 혹은 `index.hbs` 등의 엔진을 써야 한다.
router.use((req, res, next) => {
  return res.render('index')
})

// or
router.use('*', (req, res, next) => {
  return res.render('index')
})
```

## Mode

기본적으로 seamless한 URL 네비게이션을 위해 `mode: 'history',` 설정을 사용합니다.

## Error page

Router 목록의 가장 마지막에는 항상 `*` mapping를 배치하여 `Not found` 화면을 제공하도록 합니다.

## Authentication check

`SPA`는 URL 이동 시 서버로 트래픽을 보내지 않기 때문에 로그인 상태 체크를 router에서 해야 합니다.
아래처럼 `router.beforeEach`라는 Router Hook을 사용해서 로그인 상태를 체크하도록 합니다.

```javascript
// See /router/index.js
router.beforeEach((to, from, next) => {
  // TODO: Do checking authentications
  // Hook is accepted only when `next` function is invoked
  next()
})
```
