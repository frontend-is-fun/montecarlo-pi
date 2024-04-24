module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "airbnb",
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "no-unused-vars": "warn",
    "import/extensions": [
      0,
      "ignorePackages",
      {
        "js": "never",
        "jsx": "never",
        "ts": "never",
        "tsx": "never"
      }
    ],
    "no-undef": "off",
    "jsx-no-useless-fragment": 0,
    "react/jsx-closing-tag-location": ["error", "line-aligned"],
    "react/jsx-indent": ["error", 2],
    "react/jsx-indent-props": ["error", 2],
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    "react/jsx-props-no-spreading": 0,
    "eact/jsx-no-useless-fragment": 0,
    "react/jsx-max-props-per-line": [
      "error",
      {
        "maximum": 1
      }
    ],
    "jsx-a11y/click-events-have-key-events": 0,
    "jsx-a11y/no-static-element-interactions": 0,
    "react/jsx-none-expression-per-line": 0,
    "react/jsx-one-expression-per-line": 0,
    "react/destructuring-assignment": 0,
    "import/prefer-default-export": 0,
    "jsx-a11y/heading-has-content": 0,
    "react/function-component-definition": 0,
    "jsx-a11y/no-noninteractive-element-interactions": 0,
    "react/jsx-filename-extension": [
      1,
      {
        "extensions": [".js", ".jsx", ".tsx"]
      }
    ],
    "no-console": "warn",
    "func-names": 0,
    "no-param-reassign": 0,
    "linebreak-style": "off",
    "function-paren-newline": 0,
    "max-len": [1, 600],
    "import/no-extraneous-dependencies": 0,
    "no-await-in-loop": 0,
    "class-methods-use-this": 0,
    "object-curly-newline": 0,
    "no-restricted-syntax": ["error", "LabeledStatement", "WithStatement"],
    "quotes": [1, "single"],
    "no-underscore-dangle": 0,
    "jsx-quotes": [1, "prefer-single"],
    "array-callback-return": 0,
    "react/require-default-props": "warn"
  },
}
