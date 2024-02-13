import React from 'react'
import { useFields } from 'context/fields'
import { renderBlocks } from 'components'
import {
	type Page,
	type PageBoardMembersProps,
	type RenderSettings,
} from 'types'
import Layout from 'components/Layout'
import { usePages } from 'context/pages'
import Link from 'next/link'
import ImageBlock from 'components/theme/plain/Image'

export default function PageBoardMembers() {
	const [f] = useFields()
	const [{ page }] = usePages()
	const renderSettings: RenderSettings = { location: 'header' }
	const header = renderBlocks(f.blocks('headerContent'), renderSettings)
	const body = renderBlocks(f.blocks('body'))

	// Const [pages, setPages] = useState<Page[]>([])

	// useEffect(() => {
	//   fetchChildPages('', page._id, false).then((res: PagesGqlResponse) => {
	//     // console.log(res)
	//     setPages(res.pages)
	//   })
	// }, [])

	const passedObject = page.miscdata as PageBoardMembersProps

	let memberPages = [] as Page[]
	if (passedObject && passedObject.membersPages) {
		memberPages = passedObject.membersPages
	}

	const dimensions = {
		styleDesk: 'fit-to-object',
		widthDesk: 320,
		heightDesk: 320,
		pureimage: true,
	}

	return (
		<Layout>
			{header}

			<section className="flex-container-wrapper md-width -mt-2 board-of-directors">
				<div className="flex-row">
					{memberPages &&
						memberPages.length &&
						memberPages.map((itm, index) => {
							const img = { _id: '', url: '', alt: '' }
							let jobtitle = ''
							let firstName = ''
							let secondName = ''
							if (itm.pageListingImage) {
								img._id = itm.pageListingImage._id
								img.url = itm.pageListingImage.url
								img.alt = itm.title
							}

							// Const img = { _id: itm.pageListingImage._id, url: itm.pageListingImage.url, alt: itm.title }
							if (itm.fields) {
								jobtitle = String(
									itm.fields.find((m) => m.alias === 'jobTitle')?.text,
								)
								firstName = String(
									itm.fields.find((m) => m.alias === 'firstName')?.text,
								)
								secondName = String(
									itm.fields.find((m) => m.alias === 'secondName')?.text,
								)
							}

							return (
								<div
									key={index}
									className="flex-col-sm-6 flex-col-md-4 md-grid-lg -mb-4"
								>
									<div className="card_person_image">
										{/* //image must be 320px 320px with blu gradient background */}
										{img && img.url && (
											<ImageBlock image={img} dimensions={dimensions} />
										)}
									</div>
									<div className="card_person_info p--s">
										<Link href={itm.url} className="full__link">
											<h2>
												<i>{firstName}</i> {secondName}
											</h2>
											<div dangerouslySetInnerHTML={{ __html: jobtitle }} />
										</Link>
									</div>
								</div>
							)
						})}
				</div>
			</section>
			{body}
		</Layout>
	)
}
