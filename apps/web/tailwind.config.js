module.exports = {
	content: ['./app/**/*.{js,jsx,ts,tsx}'],
	plugins: [require('@tailwindcss/typography')],
	theme: {
		extend: {
			colors: {
				brand: {
					DEFAULT: '#2CB67D',
					50: '#E6F9F1',
					100: '#D2F4E6',
					200: '#A5E9CD',
					300: '#77DEB3',
					400: '#46D298',
					500: '#2CB67D',
					600: '#239062',
					700: '#1B6F4C',
					800: '#124A33',
					900: '#092519',
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
