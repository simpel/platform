import moment from 'moment'

enum typeDateAgo {
	Today = 'today',
	Yesterday = 'yesterday',
	SixDayAgo = '6 days ago',
	OneWeekAgo = '1 week ago',
	ThreeWeekAgo = '3 weeks ago',
	OneMonthAgo = '1 month ago',
}

export const getBaseDateFormat = (dateString: string): string | null => {
	if (!dateString) return null
	// Return moment(dateStr).format(dateFormat.baseDateFormat)
	return new Date(dateString).toLocaleDateString('en-gb', {
		timeZone: 'UTC',
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	})
}

export const getLocaleDate = (dateString: string): string | null => {
	if (!dateString) return null
	return moment(dateString).format('lll')
}

export const getDateYear = (dateString: string): number | null => {
	if (!dateString) return null
	return moment(dateString).year()
}

export const momentDayWeekMonthsAgo = (dateString: string): number | null => {
	if (!dateString) return null
	let result
	const now = moment()
	const days = now.diff(dateString, 'days')
	const weeks = now.diff(dateString, 'weeks')
	const months = now.diff(dateString, 'months')
	if (months) {
		result = months > 1 ? `${months} Months` : `${months} Month`
	} else if (weeks) {
		result = weeks > 1 ? `${weeks} Weeks` : `${weeks} Week`
	} else if (days) {
		result = days > 1 ? `${days} Days` : `${days} Day`
	}

	return result
}

export const isToday = (dateString: string): boolean =>
	moment(dateString).isSame(moment(), 'day')
export const numberOfDayAgo = (dateString: string, count: number): boolean =>
	moment(dateString).isSame(moment().subtract(count, 'day'), 'd')
export const isMonthAgo = (dateString: string): boolean =>
	moment(dateString).isSame(moment().subtract(1, 'months'), 'months')

export function getDateAgoFormatting(dateString: string): string {
	if (!dateString) return ''

	return moment(dateString).fromNow()
	// Return moment(dateStr).add(3, 'hours').fromNow()
	// if (isToday(dateStr)) {
	//   return typeDateAgo.Today
	// }
	// if (numberOfDayAgo(dateStr, 1)) {
	//   return typeDateAgo.Yesterday
	// }
	// if (numberOfDayAgo(dateStr, 6)) {
	//   return typeDateAgo.SixDayAgo
	// }
	// if (numberOfDayAgo(dateStr, 7)) {
	//   return typeDateAgo.OneWeekAgo
	// }
	// if (numberOfDayAgo(dateStr, 21)) {
	//   return typeDateAgo.ThreeWeekAgo
	// }
	// if (isMonthAgo(dateStr)) {
	//   return typeDateAgo.OneMonthAgo
	// }
	// return getBaseDateFormat(dateStr) || ''
}
