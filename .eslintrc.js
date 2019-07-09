// https://eslint.org/docs/user-guide/configuring
module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
    ecmaFeatures: {
      'jsx': true
    }
  },
  globals: {
    'Promise': true
  },
  env: {
    'browser': true,
    'node': true
  },
  settings: {
    'import/resolver': {
      'alias': {
        map: [
          ['src', './src']
        ],
        extensions: ['.js', '.vue']
      }
    }
  },
  // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
  extends: [
    'standard',
    'plugin:vue/strongly-recommended'
  ],
  plugins: [
    'vue'
  ],
  rules: {
    'arrow-parens': 'off',
    // `white-space: pre` issue
    'vue/singleline-html-element-content-newline': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 2 : 'off',
    'no-extra-parens': [2, 'all', { ignoreJSX: 'all' }],
    'no-trailing-spaces': [2, { 'skipBlankLines': true }],
    'vue/component-name-in-template-casing': ['error', 'kebab-case'],
    'new-cap':  [2, { newIsCapExceptionPattern: 'Promise' }]
  }
}
