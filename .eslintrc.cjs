module.exports = {
	env: {
		node: true,
		es2021: true,
	},
	parser: "@babel/eslint-parser",
	parserOptions: {
		ecmaVersion: 2022,
		requireConfigFile: false,
		babelOptions: {
			plugins: [
				'@babel/plugin-syntax-import-assertions'
			],
		},
	},
	extends: ['airbnb-base', 'prettier'],
	rules: {
		'linebreak-style': 0,
		'import/extensions': 0,
		'no-console': 0
	}
};
