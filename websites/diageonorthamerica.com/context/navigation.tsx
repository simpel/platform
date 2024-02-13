import React, {
	createContext,
	useContext,
	type ReactNode,
	useState,
	useEffect,
	useMemo,
} from 'react'
import { useRouter } from 'next/router'

import { type MicroPage, type NavPage } from 'types'

type NavigationState = {
	breadcrumbs: MicroPage[]
	currentNavigationItem: string
	menuOpen: boolean
	searchOpen: boolean
	navPages: NavPage
}

type NavigationUpdate = {
	setBreadcrumbs: (breadcrumbs: MicroPage[]) => void
	setCurrentNavigationItem: (url: string) => void
	setMenuOpen: (open: boolean) => void
	setSearchOpen: (open: boolean) => void
	setNavPages: (navPages: NavPage) => void
}

const NavigationStateContext = createContext<NavigationState | undefined>(
	undefined,
)
const NavigationUpdateContext = createContext<NavigationUpdate | undefined>(
	undefined,
)

export type TNavigationProvider = {
	children?: ReactNode
	breadcrumbs?: MicroPage[]
	navpages?: NavPage
}

export function NavigationProvider({
	children,
	...props
}: TNavigationProvider) {
	const [breadcrumbs, setBreadcrumbs] = useState<MicroPage[]>(
		props.breadcrumbs ?? [],
	)
	const [currentNavigationItem, setCurrentNavigationItem] = useState('')
	const [menuOpen, setMenuOpen] = useState(false)
	const [searchOpen, setSearchOpen] = useState(false)

	const [navPages, setNavPages] = useState<NavPage | undefined>(props.navpages)

	const state: NavigationState = useMemo(() => {
		return {
			breadcrumbs,
			currentNavigationItem,
			menuOpen,
			searchOpen,
			navPages: navPages!,
		}
	}, [breadcrumbs, currentNavigationItem, menuOpen, searchOpen, navPages])

	const updateFns: NavigationUpdate = useMemo(() => {
		return {
			setBreadcrumbs,
			setCurrentNavigationItem,
			setMenuOpen,
			setSearchOpen,
			setNavPages,
		}
	}, [
		setBreadcrumbs,
		setCurrentNavigationItem,
		setMenuOpen,
		setSearchOpen,
		setNavPages,
	])

	const router = useRouter()

	/**
	 * Handle client-side navigation
	 * Make sure local state is updated between navigation events
	 */
	useEffect(() => {
		// Close menu and search on page navigation
		const handleRouteChange = () => {
			setMenuOpen(false)
			setSearchOpen(false)
		}

		router.events.on('routeChangeStart', handleRouteChange)

		return () => {
			router.events.off('routeChangeStart', handleRouteChange)
		}
	})
	useEffect(() => {
		setBreadcrumbs(props.breadcrumbs ?? [])
	}, [props.breadcrumbs])

	useEffect(() => {
		setNavPages(props.navpages ?? undefined)
	}, [props.navpages])

	return (
		<NavigationStateContext.Provider value={state}>
			<NavigationUpdateContext.Provider value={updateFns}>
				{children}
			</NavigationUpdateContext.Provider>
		</NavigationStateContext.Provider>
	)
}

export function useNavigation(): [NavigationState, NavigationUpdate] {
	const state = useContext(NavigationStateContext)
	const updateFns = useContext(NavigationUpdateContext)

	if (state === undefined || !state || updateFns === undefined || !updateFns) {
		throw new Error('useNavigation must be used within NavigationProvider')
	}

	return [state, updateFns]
}
