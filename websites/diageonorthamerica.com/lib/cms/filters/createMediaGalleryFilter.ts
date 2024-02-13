import { type FilterGroup } from 'components/theme/Diageo/DContentWithFilters'
import { type GalleryItem } from 'types'

export const createMediaGalleryFilter = (
	galleryItems: GalleryItem[],
): FilterGroup[] => {
	if (galleryItems === undefined || galleryItems.length === 0) return []
	// Const yearsFilter = galleryItems.reduce((acc: { label: string; count: number }[], item) => {
	//   if (!item.pubYear) return acc
	//   const existingYear = acc.find((b) => b.label === `${item.pubYear}`)
	//   if (existingYear) {
	//     existingYear.count += 1
	//   } else {
	//     acc.push({ label: `${item.pubYear}`, count: 1 })
	//   }
	//   return acc
	// }, [])
	// const brandsFilter = galleryItems.reduce((acc: { label: string; count: number }[], item) => {
	//   item.brands.map((brand) => {
	//     const existingBrand = acc.find((b) => b.label === brand.text)
	//     if (existingBrand) {
	//       existingBrand.count += 1
	//     } else {
	//       acc.push({ label: brand.text, count: 1 })
	//     }
	//   })
	//   return acc
	// }, [])
	const categoriesFilter = galleryItems.reduce(
		(acc: Array<{ label: string; count: number }>, item) => {
			item.topics.map((category) => {
				const existingCategory = acc.find((b) => b.label === category.text)
				if (existingCategory) {
					existingCategory.count += 1
				} else {
					acc.push({ label: category.text, count: 1 })
				}
			})
			return acc
		},
		[],
	)

	const filters = [
		// {
		//   name: 'year',
		//   label: 'Select Year',
		//   isExpanded: true,
		//   options: yearsFilter.map(({ label, count }) => ({
		//     value: label,
		//     label,
		//     isSelected: false,
		//     dataCount: count,
		//     dataKey: 'year',
		//     isHidden: false,
		//     name: 'year',
		//   })),
		//   dataKey: 'year',
		//   selectedOptionCount: 0,
		// },
		// {
		//   name: 'brands',
		//   label: 'Brands',
		//   isExpanded: true,
		//   options: brandsFilter.map(({ label, count }) => ({
		//     value: label,
		//     label,
		//     isSelected: false,
		//     dataCount: count,
		//     dataKey: 'brand',
		//     isHidden: false,
		//     name: 'brand',
		//   })),
		//   dataKey: 'brand',
		//   selectedOptionCount: 0,
		// },
		{
			name: 'category',
			label: 'Category',
			isExpanded: true,
			options: categoriesFilter.map(({ label, count }) => ({
				value: label,
				label,
				isSelected: false,
				dataCount: count,
				dataKey: 'category',
				isHidden: false,
				name: 'category',
			})),
			dataKey: 'category',
			selectedOptionCount: 0,
		},
	]
	return filters
}
