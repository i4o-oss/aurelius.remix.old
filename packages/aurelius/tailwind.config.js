/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	darkMode: 'class',
	plugins: [require('@tailwindcss/typography')],
	prefix: 'au-',
	theme: {
		extend: {
			colors: {
				brand: {
					DEFAULT: 'rgb(var(--brand) / <alpha-value>)',
					subtle: 'rgb(var(--brand-subtle) / <alpha-value>)',
					hover: 'rgb(var(--brand-hover) / <alpha-value>)',
					states: 'rgb(var(--brand-states) / <alpha-value>)',
				},
				primary: {
					DEFAULT: 'rgb(var(--primary) / <alpha-value>)',
					subtle: 'rgb(var(--primary-subtle) / <alpha-value>)',
					foreground:
						'rgb(var(--primary-foreground) / <alpha-value>)',
					'foreground-subtle':
						'rgb(var(--primary-foreground-subtle) / <alpha-value>)',
				},
				subtle: {
					DEFAULT: 'rgb(var(--subtle) / <alpha-value>)',
				},
			},
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
				serif: ['Merriweather', 'serif'],
				serif: ['Orbitron', 'serif'],
			},
			animation: {
				text: 'text 5s ease infinite',
			},
			keyframes: {
				text: {
					'0%, 100%': {
						'background-size': '200% 200%',
						'background-position': 'left center',
					},
					'50%': {
						'background-size': '200% 200%',
						'background-position': 'right center',
					},
				},
			},
		},
	},
}
