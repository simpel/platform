export const getGradient = (gradient: string, opacity = 100) => {
	switch (gradient) {
		case `EVP-Grad-01`:
			return `linear-gradient(102.31deg,rgb(198 230 237 / ${opacity}%) 0%,rgb(242 221 243 / ${opacity}%) 100%)`
		case `EVP-Grad-02`:
			return `linear-gradient(102.32deg,rgb(194 234 237 / ${opacity}%) 0%,rgb(221 246 215 / ${opacity}%) 100%)`
		case `EVP-Grad-03`:
			return `linear-gradient(102.32deg,rgb(255 232 207 / ${opacity}%) 0%,rgb(251 202 195 / ${opacity}%) 100%)`
		case `EVP-Grad-04`:
			return `linear-gradient(102.32deg,rgb(255 249 211 / ${opacity}%) 0%,rgb(252 223 186 / ${opacity}%) 100%)`
		case `EVP-Grad-05`:
			return `linear-gradient(314.83deg,rgb(253 249 221 / ${opacity}%) 0%,rgb(198 229 235 / ${opacity}%) 100%)`
		case `EVP-Grad-06`:
			return `linear-gradient(314.94deg,rgb(255 209 216 / ${opacity}%) 0%,rgb(221 212 245 / ${opacity}%) 100%)`
		case `EVP-Grad-07`:
			return `linear-gradient(313.41deg,rgb(249 210 223 / ${opacity}%) 0%,rgb(228 248 214 / ${opacity}%) 100%)`
		case `EVP-Grad-08`:
			return `linear-gradient(313.41deg,rgb(213 243 247 / ${opacity}%) 0%,rgb(186 211 240 / ${opacity}%) 100%)`
		case 'theme-amber':
			return `linear-gradient(135deg, rgba(255, 241, 215, 1) 0%, rgba(255, 241, 205, 1) 50%, rgba(253, 219, 152, 1) 100%)`
		case 'theme-beige':
			return `linear-gradient(135deg, rgba(255, 241, 215, 1) 0%, rgba(255, 241, 205, 1) 50%, rgba(253, 219, 152, 1) 100%)`
		case 'theme-red':
			return 'linear-gradient(135deg, rgba(253, 246, 235, 1) 0%, rgba(255, 218, 214, 1) 50%, rgba(255, 161, 150, 1) 100%)'
		case 'theme-brown':
			return 'linear-gradient(135deg, rgba(244, 237, 218, 1) 0%, rgba(244, 229, 198, 1) 50%, rgba(220, 162, 95, 1) 100%)'
		case 'theme-blue':
			return 'linear-gradient(135deg, rgba(230, 244, 255, 1) 0%, rgba(232, 245, 255, 1) 64%, rgba(246, 231, 255, 1) 100%)'
		case 'theme-purple':
			return 'linear-gradient(11.81deg, #f0dff6 0.3%, #ffffff 94.83%)'
		case 'theme-green':
			return 'linear-gradient(135deg, rgba(220, 246, 216, 1) 0%, rgba(223, 243, 203, 1) 50%, rgba(241, 248, 204, 1) 100%)'
		case 'theme-white':
			return '#ffffff'
		default:
			return `white`
	}
}
