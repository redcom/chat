const OFF = 0
const WARN = 1
const ERROR = 2

module.exports = {
  extends: 'airbnb-base',
  plugins: ['import'],
  rules: {
    semi: OFF,
    'comma-dangle': OFF,
    'arrow-parens': OFF
  }
}
