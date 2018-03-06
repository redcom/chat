const OFF = 0
const WARN = 1
const ERROR = 2

module.exports = {
  extends: 'airbnb',
  plugins: ['react', 'jsx-a11y', 'import'],
  rules: {
    'react/jsx-filename-extension': OFF,
    'react/prop-types': OFF,
    semi: OFF,
    'comma-dangle': OFF,
    'arrow-parens': OFF,
    'object-curly-newline': OFF
  },
  globals: {
    document: 1
  },
  parser: 'babel-eslint',
  env: {
    browser: 1
  }
}
