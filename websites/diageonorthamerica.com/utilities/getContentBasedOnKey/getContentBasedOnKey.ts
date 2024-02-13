/**
 *
 * @param key  name of the key to use as a filter
 * @param keyValue the value of the key to use as a filter
 * @param content the field of block to filter
 * @returns a content item than is of type <T>
 */

export const getContentBasedOnKey = <T>(
	key: string,
	keyValue: string,
	content?: T[],
): T | undefined => {
	if (!content) return undefined
	return content.find((item: T) => item[key] === keyValue)!
}
