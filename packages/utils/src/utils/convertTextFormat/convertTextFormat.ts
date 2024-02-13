import { type TConvertTextFormat } from './TConvertTextFormat'

/**
 * Converts the text format based on the specified format.
 * @param text The text to be converted.
 * @param format The format to convert the text to.
 * @returns The converted text.
 */
export const convertTextFormat = (
	text: string,
	format: TConvertTextFormat,
): string => {
	switch (format) {
		case 'kebab-case': {
			return text
				.replaceAll(/([a-z\d]|(?=[A-Z]))([A-Z])/g, '$1-$2')
				.toLowerCase()
		}

		default: {
			console.info(
				`convertTextFormat: ${format} is not implemented yet or was not found.`,
			)
			return text
		}
	}
}
