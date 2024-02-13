import React from 'react'
import ImageBlock from '../plain/Image'
import { AuthorProps } from '../../propTypes'
import Button from '../plain/Button'

function DAuthor({
	image,
	button,
	author,
	title,
	description,
	className,
}: AuthorProps) {
	const dimensions = {
		styleDesk: 'fit-to-object',
		widthDesk: 100,
		heightDesk: 100,
		pureimage: true,
	}

	return (
		<div className={`author flex flex-wrap ${className || ''}`}>
			<div className="author__top flex flex-align-center">
				<div className="author__image">
					{image && <ImageBlock image={image} dimensions={dimensions} />}
					{/* <Image image={image} /> */}
				</div>
				<div className="author__content">
					{author && (
						<div
							className="author__name"
							dangerouslySetInnerHTML={{ __html: author }}
						></div>
					)}
					{title && <p className="author__title">{title}</p>}
				</div>
			</div>
			<div className="author__bottom">
				<div className="author__text full-width">
					{description && <p>{description}</p>}
				</div>
				{button && <Button size="small" {...button} />}
			</div>
		</div>
	)
}

export default DAuthor
