/**
 * Converts pixels to rems
 * @param px - The number of pixels to convert.
 * @returns The converted value in rems.
 */
export const rem = (px: number): string => {
	return `${px / 16}rem`
}
