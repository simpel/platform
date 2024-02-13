import { fetchCategories, fetchPressReleasesFeatures } from 'lib/cms/api'
import { mapCategoriesToOptions } from 'lib/cms/page-utils'
import { type PageFeatureLandingProps } from 'types'

export const featuresLandingPage = async () => {
	const allPressReleases = await fetchPressReleasesFeatures(
		true,
		0,
		false,
		false,
		0,
	).then((response) => {
		return response.contents
	})

	const topics = await fetchCategories('topics').then((response) => {
		return mapCategoriesToOptions(response?.contents)
	})

	const regions = await fetchCategories('regions').then((response) => {
		return mapCategoriesToOptions(response?.contents)
	})

	const drinkCategories = await fetchCategories('drink-categories').then(
		(response) => {
			return mapCategoriesToOptions(response?.contents)
		},
	)

	const miscData: PageFeatureLandingProps = {
		allPressReleases,
		topics,
		regions,
		drinkCategories,
	}

	return miscData
}
