// eslint-disable-next-line
const colors = require('tailwindcss/colors')

module.exports = {
	mode: 'jit',
	purge: ['./components/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
	darkMode: 'class', // 'media' or 'class'
	theme: {
		extend: {
			colors: {
				gray: colors.trueGray,
				grayish: '#F6F6F6',
				green: {
					light: '#75E352',
					DEFAULT: '#499E2E',
					dark: '#10312E',
				},
				red: {
					DEFAULT: '#BD2C44',
					dark: '#831426',
				},
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [
		require('@tailwindcss/typography'),
		require('@tailwindcss/aspect-ratio'),
		require('@tailwindcss/forms')({
			strategy: 'class',
		}),
		require('tailwindcss-textshadow'),
	],
}
