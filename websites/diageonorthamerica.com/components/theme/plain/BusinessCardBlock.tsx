import BusinessAreaCards from 'components/styled-components/Careers/BusinessAreaCards/BusinessAreaCards'
import React from 'react'
import { type BusinessCardBlockProps } from '../../propTypes'

export default function BusinessCardBlock({
	blockRichTextTitle,
	blockRichTextIntro,
	blockLink,
	useCarousel,
	blocks,
	blockTheme,
}: BusinessCardBlockProps) {
	return (
		<BusinessAreaCards
			gradient={blockTheme ?? ''}
			blocks={blocks}
			richTextTitle={blockRichTextTitle}
			rightRichText={blockRichTextIntro}
			blockLink={blockLink}
			useCarousel={useCarousel}
		/>
	)
	// Const dimensions = { styleDesk: 'business-card-image', widthDesk: 400, heightDesk: 300, pureimage: true }

	// return (
	//   <section className="flex-container-wrapper -mt-10 ">
	//     <div className="career-business-cards">
	//       {blocks && blocks.length
	//         ? blocks.map((itm, index) => {
	//             return (
	//               <div key={index} className="business-card">
	//                 <Link href={itm.pageLink} className="image-link">
	//                   {itm.image && <ImageBlock image={itm.image} dimensions={dimensions} />}
	//                 </Link>
	//                 <div className="card-content">
	//                   <Link href={itm.pageLink}>
	//                     {itm.title && <h3>{itm.title}</h3>}
	//                     <div className="link-label" dangerouslySetInnerHTML={{ __html: itm.itemText }}></div>
	//                   </Link>
	//                 </div>
	//               </div>
	//             )
	//           })
	//         : null}
	//     </div>
	//   </section>
	// )
}
