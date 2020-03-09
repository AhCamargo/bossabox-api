module.exports = {
    env: {
      es6: true,
      node: true,
    },
    extends: [
      'airbnb-base',
      'prettier'
    ],
    plugins: ['prettier'],
    globals: {
      Atomics: 'readonly',
      SharedArrayBuffer: 'readonly',
    },
    parserOptions: {
      ecmaVersion: 2018,
      sourceType: 'module',
    },
    rules: {
      "prettier/prettier": "error",
  "class-methods-use-this": "off", //todo método precisa usar o this
  "no-param-reassign": "off", //alterar parâmetros(sequelize faz isso)
  "camelcase": "off",
  "no-unused-vars": ["error", { "argsIgnorePattern": "next" }], //habilitando usar variáveis sem ter que utilizar
    },
  };
  