/* eslint-disable no-bitwise */
export const lighten = (color = '#000000', opacity = 1) => {
	// Convert to color channels
	const number_ = Number.parseInt(color.slice(1), 16)
	let R = number_ >> 16
	let G = (number_ >> 8) & 0x00_ff
	let B = number_ & 0x00_00_ff

	// Interpolate channel
	opacity = Math.min(Math.max(opacity, 0), 1)
	R = Math.round(R + (1 - opacity) * (255 - R))
	G = Math.round(G + (1 - opacity) * (255 - G))
	B = Math.round(B + (1 - opacity) * (255 - B))

	// Encode as hex
	return (
		'#' +
		(
			0x1_00_00_00 +
			(R < 255 ? (R < 1 ? 0 : R) : 255) * 0x1_00_00 +
			(G < 255 ? (G < 1 ? 0 : G) : 255) * 0x1_00 +
			(B < 255 ? (B < 1 ? 0 : B) : 255)
		)
			.toString(16)
			.slice(1)
	)
}
