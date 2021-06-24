module.exports = {
	parser: 'babel-eslint',
	env: {
		browser: true,
		es6: true,
	},
	extends: [
		'naver',
	],
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly',
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: 'tsconfig.json',
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 2018,
		sourceType: 'module',
	},
	plugins: ['react', 'react-native', '@typescript-eslint'],
	rules: {
		'@typescript-eslint/interface-name-prefix': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-use-before-define': ['error'],
		'no-use-before-define': 'off',
		// production 환경에서는 on 으로 되어있어야 함.
		'no-console': 'off',
		'arrow-parens': ['error', 'always'],
		// prettier과 충돌되는 부분
		'prettier/prettier': 'off',
		// array element들은 프로그래머의 개성에 따라 customazing 할 수 있도록 꺼 놓음
		'array-element-newline': 'off',
	},
};
