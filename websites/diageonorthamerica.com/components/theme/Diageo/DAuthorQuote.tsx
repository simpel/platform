import React from 'react'
import { type AuthorQuote } from '../../propTypes'
import Image from '../plain/Image'

const DAuthorQuote = ({
	image,
	author,
	description,
	className,
}: AuthorQuote) => {
	const dimensions = {
		styleDesk: 'fit-to-object',
		widthDesk: 80,
		heightDesk: 80,
		pureimage: true,
	}

	return (
		<div
			className={`author-quote flex flex-row--align-v-center ${
				className || ''
			}`}
		>
			{image?.url && (
				<div className="author-quote__image">
					<Image image={image} dimensions={dimensions} />
				</div>
			)}
			<div className="author-quote__content">
				{author && (
					<div
						dangerouslySetInnerHTML={{ __html: author }}
						className="author-quote__name"
					/>
				)}
				{description && (
					<p className="author-quote__description">{description}</p>
				)}
			</div>
		</div>
	)
}

export default DAuthorQuote
