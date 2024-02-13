import { fetchChildPagesLite, fetchCategories } from 'lib/cms/api'
import { type Page, type PageBrandLandingProps } from 'types'

export const brandLandingPage = async (currentPage: Page) => {
	const brandPages = await fetchChildPagesLite(
		'brandPage',
		currentPage._id,
		false,
		999,
	).then((response) => {
		return response
	})

	const categories = await fetchCategories('drink-categories').then(
		(response) => {
			return response.contents
		},
	)

	const miscData: PageBrandLandingProps = {
		brandPages,
		categories,
	}

	return miscData
}
