import { type TExampleUtilityFunction } from './TExampleUtilityFunction'

/**
 * I'm a pointless utility function example
 * @param text a text string.
 * @returns a text string.
 */
export const exampleUtilityFunction = ({
	text,
}: TExampleUtilityFunction): string => {
	return text
}
