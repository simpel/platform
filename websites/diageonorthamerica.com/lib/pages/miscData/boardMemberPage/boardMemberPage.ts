import { fetchChildPages, fetchMedia } from 'lib/cms/api'
import { type Page, type PageBoardMemberProps } from 'types'

export const boardMemberPage = async (currentPage: Page) => {
	const memberPages = await fetchChildPages(
		'',
		currentPage.parent._id,
		false,
	).then((response) => {
		return response
	})

	const media = await fetchMedia([currentPage.pageListingImage2._id]).then(
		(response) => {
			return response
		},
	)
	const miscData: PageBoardMemberProps = {
		memberPages,
		media,
	}

	return miscData
}
