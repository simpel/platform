/* eslint-disable unicorn/prefer-module */

'use strict'

module.exports = {
	extends: ['stylelint-config-standard', 'stylelint-config-standard-scss'],
	formatter: 'compact',
	cache: true,
	configBasedir: './',
	plugins: ['stylelint-scss'],
	rules: {
		'declaration-block-no-shorthand-property-overrides': null,
		'selector-pseudo-class-no-unknown': [
			true,
			{
				ignorePseudoClasses: ['export'],
			},
		],
		'declaration-block-no-redundant-longhand-properties': [
			true,
			{
				ignoreShorthands: ['/grid/'],
			},
		],
		'selector-class-pattern': null,
		'color-function-notation': null,
	},
}
