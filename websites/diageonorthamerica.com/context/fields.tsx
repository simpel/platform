import React, {
	createContext,
	useContext,
	type ReactNode,
	useState,
	useEffect,
} from 'react'
import { type Field, type Page, type RenderSettings } from 'types'
import { type ParsedFields, parseFields } from 'lib/cms/field-utils'
import { type ParsedMedia, parseMedia } from 'lib/cms/media'
import { usePages } from './pages'

export type FieldsState = ParsedFields &
	ParsedMedia & {
		fields: Field[]
		settings: RenderSettings
		/**
		 * If the component is a member of an array, this is its index
		 */
		index: number
	}

const FieldsStateContext = createContext<FieldsState | null>(null)

type Props = Partial<Pick<FieldsState, 'fields' | 'settings' | 'index'>> & {
	readonly children: ReactNode
	/**
	 * Page for referencedMedia and referencedContent. If undefined, current page will be used
	 */
	readonly page?: Page
}

export const FieldsProvider = ({ children, ...props }: Props) => {
	const [fields, setFields] = useState<Field[]>(props.fields || [])
	const [settings, setSettings] = useState<RenderSettings>(props.settings || {})
	const [index] = useState<number>(props.index || 0)
	const [{ page: currentPage }] = usePages()

	let page: Page
	page = props.page ? props.page : currentPage

	const state: FieldsState = {
		fields,
		settings,
		index,
		...parseFields(fields, page),
		...parseMedia(fields, page),
	}

	/**
	 * Handle client-side navigation
	 * Make sure local state is updated between navigation events
	 */
	useEffect(() => {
		setFields(props.fields || [])
	}, [props.fields])
	useEffect(() => {
		setSettings(props.settings || {})
	}, [props.settings])

	return (
		<FieldsStateContext.Provider value={state}>
			{children}
		</FieldsStateContext.Provider>
	)
}

function isFieldsStateOk(state: FieldsState | null): state is FieldsState {
	return Boolean(state)
}

export function useFields(): [FieldsState] {
	const state = useContext(FieldsStateContext)

	if (state === undefined || !isFieldsStateOk(state)) {
		throw new Error('useFields must be used within FieldsProvider')
	}

	return [state]
}
