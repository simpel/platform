import { CategoryLite } from 'types'

export const mapCategoriesToOptions = (array: CategoryLite[]) =>
	array.map(({ _id, title }) => ({ value: _id, label: title }))
