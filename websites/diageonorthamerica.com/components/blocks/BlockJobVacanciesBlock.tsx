import { useFields } from 'context/fields'
import { BlockProps, JobVacanciesBlockProps } from 'components/propTypes'
import { getComponent } from 'components'
import { Block } from 'enums'
import { JobVacancyLite, JV2, PartialPage, Theme } from 'types'
import { TileProps } from 'components/theme/Diageo/DTileListing'
import { usePages } from 'context/pages'
import { useEffect, useState } from 'react'
import { fetchJV2Lite, fetchVacanciesLite } from 'lib/cms/api'

export default function BlockJobVacanciesBlock({
	customComponent,
}: BlockProps<JobVacanciesBlockProps>) {
	const [f] = useFields()
	const [{ page }] = usePages()
	const componentIdentifier = f.text('componentIdentifier')

	const [pagelist, setPagelist] = useState([] as JV2[])

	const joblist = [] as TileProps[]
	let vacpage = {} as PartialPage

	const jobFamilies = f.list('jobFamily')
	const countries = f.list('country')
	const subWorkers = f.list('subWorkerType')

	const jobList = [] as string[]
	const countryList = [] as string[]
	const subWorkerList = [] as string[]
	let tmpTheme = ''

	let query = ''

	if (page.referencedContent) {
		const tempNode = page.referencedContent.find(
			(m) => m._id === f.content('vacanciesPage')?._id,
		)
		if (tempNode) {
			vacpage = tempNode
			query += tempNode.url + '?1=1'
		}
		const themeNode = page.referencedContent.find(
			(m) => m._id === f.content('blockTheme')?._id,
		)
		if (themeNode) {
			tmpTheme = '' + themeNode?.fields.find((m) => m.alias === 'value')?.text
		}
	}

	if (page.referencedContent) {
		if (jobFamilies) {
			jobFamilies.map((p) => {
				const obj1 = page.referencedContent.find((m) => m._id === p._id)
				if (obj1) {
					jobList.push(obj1.title)
				}
			})
			query += `&jobFamilyGroup=${jobList.join('<')}`
		} //jobFamilyGroup
		if (countries) {
			countries.map((p) => {
				const obj1 = page.referencedContent.find((m) => m._id === p._id)
				if (obj1) {
					countryList.push(obj1.title)
				}
			})
			query += `&country=${countryList.join('<')}`
		} // country=
		if (subWorkers) {
			subWorkers.map((p) => {
				const obj1 = page.referencedContent.find((m) => m._id === p._id)
				if (obj1) {
					subWorkerList.push(obj1.title)
				}
			})
			query += `&subWorkerType=${subWorkerList.join('<')}`
		} // country=
	}

	// console.log('jobList', jobList)
	// console.log('countryList', countryList)

	useEffect(() => {
		// fetchVacanciesLite(6, jobList, countryList, subWorkerList).then((res: JobVacancyLite[]) => {
		//   setPagelist(res)
		// })
		fetchJV2Lite(6, jobList, countryList, subWorkerList, [], []).then(
			(res: JV2[]) => {
				setPagelist(res)
			},
		)
	}, [])

	if (pagelist) {
		pagelist.map((itm) => {
			const newitm = {
				title: itm.jobPostingTitle,
				subtitle: itm.locations[0].locations[0],
				href: query + `&jobid=${itm.key}`, //itm.externalPostingURL,
			}
			joblist.push(newitm)
		})
	}

	// console.log('marshall', query)

	const props = {
		id: componentIdentifier,
		richTextTitle: f.html('richTextTitle'),
		items: joblist,
		viewAllUrl: query,
		topTitle: f.text('topTitle'),
		blockTheme: tmpTheme as Theme,
	}

	return getComponent<JobVacanciesBlockProps>(
		Block.JobVacanciesBlock,
		props,
		componentIdentifier,
		customComponent,
	)
}
