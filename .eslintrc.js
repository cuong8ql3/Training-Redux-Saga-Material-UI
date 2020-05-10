module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:react/recommended',
    'airbnb-base',
    'prettier',
  ],
  rules: {
    'react/prop-types': [1, { 'ignore': ['children'] }],
    'linebreak-style': 0,
    'import/no-extraneous-dependencies': 0,
    'react/jsx-filename-extension': 0,
    'react/forbid-prop-types': 0,
    'react/require-default-props': 0,
    'react/jsx-props-no-spreading': 'off',
    'class-methods-use-this': 0,
    'no-unused-vars': 1,
    'import/extensions': 0,
    'import/order': 1,
    'react/prefer-stateless-function': 0,
    'no-use-before-define': 0,
    'no-param-reassign': 0,
    'import/prefer-default-export': 0,
    'react/state-in-constructor': 0,
    'import/no-cycle': 1,
    'no-underscore-dangle': 1,
    'no-console': 1,
    'prettier/prettier': ['warn', { 'singleQuote': true, 'endOfLine': 'auto' }],
  },
  plugins: ['prettier', 'import'],
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  settings: {
    'react': {
      'version': 'detect',
      'pragma': 'React',
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
          moduleDirectory: ['node_modules', 'src'],
        },
      },
    },
  },
}
