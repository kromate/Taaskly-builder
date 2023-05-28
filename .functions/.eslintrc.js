module.exports = {
	root: true,
	env: {
		es6: true,
		node: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:import/errors',
		'plugin:import/warnings',
		'plugin:import/typescript',
		'google',
		'plugin:@typescript-eslint/recommended',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: ['tsconfig.json', 'tsconfig.dev.json'],
		sourceType: 'module',
	},
	ignorePatterns: [
		'/lib/**/*', // Ignore built files.
	],
	plugins: ['@typescript-eslint', 'import'],
	rules: {
		quotes: ['off', 'double'],
		'import/no-unresolved': 0,
		'max-len': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'no-tabs': 'off',
		'indent': 'off',
		'quote-props': 'off',
		'camelcase': 'off',
	},
};
