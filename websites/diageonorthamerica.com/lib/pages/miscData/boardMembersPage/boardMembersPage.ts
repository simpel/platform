import { fetchChildPages } from 'lib/cms/api'
import { type PageBoardMembersProps, type Page } from 'types'

export const boardMembersPage = async (currentPage: Page) => {
	const membersPages = await fetchChildPages('', currentPage._id, false).then(
		(response) => {
			return response
		},
	)

	const miscData: PageBoardMembersProps = {
		membersPages,
	}

	return miscData
}
