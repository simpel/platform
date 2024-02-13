import process from 'process'
import React, {
	createContext,
	useContext,
	type ReactNode,
	useState,
	useEffect,
	useMemo,
} from 'react'
import { type Page } from 'types'
import { type ParsedFields, parseFields } from 'lib/cms/field-utils'
import { type ParsedMedia, parseMedia } from 'lib/cms/media'

type LocaleState = ParsedFields &
	ParsedMedia & {
		localePage: Page
		locale: string
		countryCode: string
	}

type LocaleUpdate = {
	setLocalePage: (page: Page) => void
	setLocale: (locale: string) => void
}

const LocaleStateContext = createContext<LocaleState | undefined>(undefined)
const LocaleUpdateContext = createContext<LocaleUpdate | undefined>(undefined)

const getCountryCode = (locale = '') => locale.split('-').slice(-1)[0]

export type TLocaleProvider = {
	children: ReactNode
} & Pick<LocaleState, 'locale' | 'localePage'>

export function LocaleProvider({ children, ...props }: TLocaleProvider) {
	const [locale, setLocale] = useState(
		(props.locale || process.env.NEXT_PUBLIC_DEFAULT_LOCALE) ?? 'en',
	)
	const [localePage, setLocalePage] = useState<Page>(props.localePage)
	const [countryCode, setCountryCode] = useState(getCountryCode(locale))

	const state: LocaleState = useMemo(() => {
		return {
			localePage,
			locale,
			countryCode,
			...parseFields(localePage.fields, localePage),
			...parseMedia(localePage.fields, localePage),
		}
	}, [localePage, locale, countryCode])

	const updateFns: LocaleUpdate = useMemo(() => {
		return {
			setLocalePage,
			setLocale,
		}
	}, [setLocalePage, setLocale])

	/**
	 * Handle client-side navigation
	 * Make sure local state is updated between navigation events
	 */
	useEffect(() => {
		setLocalePage(props.localePage)
	}, [props.localePage])

	useEffect(() => {
		const newLocale =
			(props.locale || process.env.NEXT_PUBLIC_DEFAULT_LOCALE) ?? 'en'
		setLocale(newLocale)
		setCountryCode(getCountryCode(newLocale))
	}, [props.locale])

	return (
		<LocaleStateContext.Provider value={state}>
			<LocaleUpdateContext.Provider value={updateFns}>
				{children}
			</LocaleUpdateContext.Provider>
		</LocaleStateContext.Provider>
	)
}

export function useLocale(): [LocaleState, LocaleUpdate] {
	const state = useContext(LocaleStateContext)
	const updateFns = useContext(LocaleUpdateContext)

	if (state === undefined || !state || updateFns === undefined || !updateFns) {
		throw new Error('useLocale must be used within LocaleProvider')
	}

	return [state, updateFns]
}
