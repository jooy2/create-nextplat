module.exports = {
	env: {
		node: true,
		es6: true
	},
	parserOptions: {
		parser: '@typescript-eslint/parser',
		sourceType: 'module',
		ecmaVersion: 2022,
		requireConfigFile: false,
		babelOptions: {
			plugins: ['@typescript-eslint']
		}
	},
	extends: ['airbnb-base', 'plugin:@typescript-eslint/recommended', 'prettier'],
	rules: {
		'linebreak-style': 0,
		'import/extensions': 0,
		'no-console': 0
	}
};
