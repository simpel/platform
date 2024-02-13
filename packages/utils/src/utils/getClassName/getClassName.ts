/**
 * Returns a string with all the arguments joined with a space and trimmed.
 * @param args - The strings to join and trim.
 * @returns A string with all the arguments joined with a space and trimmed
 */
export const getClassName = (...args: Array<string | undefined>) => {
	return args.join(' ').trim()
}
