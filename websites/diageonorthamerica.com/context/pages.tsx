import process from 'process'
import React, {
	createContext,
	useContext,
	type ReactNode,
	useState,
	useEffect,
	useMemo,
} from 'react'

import { type Page, type PageProps } from 'types'
import { boolean, type ParsedFields, parseFields } from 'lib/cms/field-utils'

type PagesState = ParsedFields & {
	/**
	 * Current page, without its fields. To get the fields of the current block, use the useFields hook.
	 */
	page: Page
	/**
	 * Page level properties
	 */
	pageProps?: PageProps
	/**
	 * All the category pages that are referenced on the current page
	 */
	// getCategories: (categoryIds: Content[]) => Category[]
	/**
	 * Show breadcrumbs on the current page
	 */
	showBreadcrumbs: boolean
	/**
	 * Show agegate on the current page
	 */
	showAgegate: boolean
	/**
	 * NextJS preview mode is enabled or not
	 * See: https://nextjs.org/docs/advanced-features/preview-mode
	 */
	preview?: boolean
}

type PagesUpdate = {
	setPage: (page: Page) => void
	setPreview: (preview?: boolean) => void
}

const PagesStateContext = createContext<PagesState | undefined>(undefined)
const PagesUpdateContext = createContext<PagesUpdate | undefined>(undefined)

export type TPagesProvider = {
	children: ReactNode
} & Pick<PagesState, 'page' | 'preview'>

export function PagesProvider({ children, ...props }: TPagesProvider) {
	const [page, setPage] = useState<Page>(
		Object.assign({}, props.page, { fields: undefined }),
	)
	const [preview, setPreview] = useState(props.preview)
	const [showBreadcrumbs, setShowBreadcrumbs] = useState(false)
	const [showAgegate, setShowAgegate] = useState(true)

	// Function getCategories(categoryIds: Content[]) {
	//   const catties = [] as Category[]

	//   return catties
	// return (
	//   categoryIds
	//     // Find category objects on the current page
	//     .map(({ _id }) => page.referencedContent?.find((p) => p._id === _id))
	//     // Ignore undefined
	//     .filter((c) => c)
	//     // Find all the descandent category values and count how many recipes have the given value
	//     .map((c) => ({
	//       ...c,
	//       values: pages
	//         .filter((p) => p.parent?._id === c?._id)
	//         .map(({ _id, title, urlSegment }) => ({
	//           _id,
	//           title,
	//           urlSegment,
	//           count: pages.filter((p) => p.categoryPages?.find((cp) => cp._id === _id)).length || 0,
	//         })) as CategoryValue[],
	//     }))
	//     // Only return certain fields
	//     .map(({ _id, title, values, urlSegment }) => ({ _id, title, values, urlSegment })) as Category[]
	// )
	// }

	const state: PagesState = useMemo(() => {
		return {
			page,
			// GetCategories,
			preview,
			showBreadcrumbs,
			showAgegate,
			...parseFields(page.fields || [], page),
		}
	}, [page, preview, showBreadcrumbs, showAgegate])

	const updateFns: PagesUpdate = useMemo(() => {
		return {
			setPage,
			setPreview,
		}
	}, [setPage, setPreview])

	/**
	 * Handle client-side navigation
	 * Make sure local state is updated between navigation events
	 */
	useEffect(() => {
		const whitelistedFields = new Set([
			'metaTitle',
			'metaDescription',
			'openGraphTitle',
			'openGraphDescription',
			'enableAmp',
		])
		// SetPage(Object.assign({}, props.page, { fields: undefined }))
		// Remove non whitelisted fields from the page context
		setPage(
			Object.assign({}, props.page, {
				fields: props.page.fields.filter((f) => whitelistedFields.has(f.alias)),
			}),
		)
		const forceBreadcrumbs = ['pressReleaseLandingPage']
		if (forceBreadcrumbs.includes(props.page.contentType)) {
			setShowBreadcrumbs(true)
		} else {
			setShowBreadcrumbs(boolean(props.page.fields)('showBreadcrumbs', false))
		}

		/**
		 * Original: page by page controlled via CMS
		 * setShowAgegate(boolean(props.page.fields)('enableAgegate', true))
		 *
		 * Comprend version: section, stored in env file
		 */
		const ageGateRootID = Number(process.env.NEXT_PUBLIC_AGE_GATE_ROOT_ID ?? '')
		const checkAgeGate: boolean =
			process.env.NEXT_PUBLIC_PROJECT === 'PR1495' ||
			props.page.sectionId === ageGateRootID ||
			props.page.pageId === ageGateRootID
		setShowAgegate(checkAgeGate)
	}, [props.page])

	useEffect(() => {
		setPreview(props.preview)
	}, [props.preview])

	return (
		<PagesStateContext.Provider value={state}>
			<PagesUpdateContext.Provider value={updateFns}>
				{children}
			</PagesUpdateContext.Provider>
		</PagesStateContext.Provider>
	)
}

export function usePages(): [PagesState, PagesUpdate] {
	const state = useContext(PagesStateContext)
	const updateFns = useContext(PagesUpdateContext)

	if (state === undefined || !state || updateFns === undefined || !updateFns) {
		throw new Error('usePages must be used within PagesProvider')
	}

	return [state, updateFns]
}
