module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
    jest: true
  },
  extends: [
    'eslint:recommended'
  ],
  parserOptions: {
    ecmaVersion: 12
  },
  rules: {
    // Reglas de estilo
    'indent': ['error', 2],
    'linebreak-style': ['error', 'unix'],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    
    // Reglas de buenas prácticas
    'no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],
    'no-console': 'off', // Permitido para logging
    'no-debugger': 'error',
    'no-alert': 'error',
    
    // Reglas de código limpio
    'prefer-const': 'error',
    'no-var': 'error',
    'object-shorthand': 'error',
    'prefer-template': 'error',
    
    // Reglas de funciones
    'arrow-spacing': 'error',
    'prefer-arrow-callback': 'error',
    
    // Reglas de objetos y arrays
    'object-curly-spacing': ['error', 'always'],
    'array-bracket-spacing': ['error', 'never'],
    'comma-dangle': ['error', 'never'],
    
    // Reglas de espaciado
    'space-before-blocks': 'error',
    'space-infix-ops': 'error',
    'key-spacing': 'error',
    
    // Reglas de seguridad
    'no-eval': 'error',
    'no-implied-eval': 'error',
    'no-new-func': 'error',
    
    // Reglas específicas para Node.js
    'no-process-exit': 'error',
    'handle-callback-err': 'error'
  },
  ignorePatterns: [
    'node_modules/',
    'coverage/',
    'dist/'
  ]
};