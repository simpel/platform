import { BgThemedTheme } from '../enums'

export const getBgThemedTheme = (themeColor: string | undefined) => {
	switch (themeColor) {
		case BgThemedTheme.Amber: {
			return 'amber'
		}
		case BgThemedTheme.Blue: {
			return 'blue'
		}
		case BgThemedTheme.Brown: {
			return 'brown'
		}
		case BgThemedTheme.Green: {
			return 'green'
		}
		case BgThemedTheme.Purple: {
			return 'purple'
		}
		case BgThemedTheme.Red: {
			return 'red'
		}
		default: {
			return null
		}
	}
}
