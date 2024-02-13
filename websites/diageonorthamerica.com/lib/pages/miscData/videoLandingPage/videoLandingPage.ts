import { fetchChildPagesLite } from 'lib/cms/api'
import { type Page, type PageVideoLandingProps } from 'types'

export const videoLandingPage = async (currentPage: Page) => {
	const videoPages = await fetchChildPagesLite(
		'',
		currentPage._id,
		true,
		999,
	).then((response) => {
		return response
	})

	const miscData: PageVideoLandingProps = {
		videoPages,
	}

	return miscData
}
