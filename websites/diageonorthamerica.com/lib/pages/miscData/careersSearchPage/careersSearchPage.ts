import { type PageCareersResultsPageData } from 'components/pages/PageCareersResults/PageCareersResults'
import { fetchJV2Lite } from 'lib/cms/api'
import { createVacanciesFilter } from 'lib/cms/filters/createVacanciesFilter'

export const careersSearchPage = async () => {
	const vacancies = await fetchJV2Lite(5000).then((response) => {
		return response
	})
	const filters = createVacanciesFilter(vacancies)

	const miscData: PageCareersResultsPageData = {
		initialVacancies: vacancies,
		initialFilters: filters,
	}

	return miscData
}
