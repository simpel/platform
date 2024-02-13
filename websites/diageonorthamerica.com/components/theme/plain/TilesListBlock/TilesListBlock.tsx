import { TilesList, RichTextTitle, RichTextBody } from '@diageo/designsystem'
import Image from 'next/image'
import { Fragment, useMemo } from 'react'
import {
	EBlockType,
	type TText,
	type TBlockTile,
	type TTilesListBlock,
	type TContentTile,
	EBlockContentType,
	type TQuote,
	EImageAlign,
} from './TTilesListBlock'

const ContentBlock = ({
	image,
	headline,
	amount,
	unit,
	icon,
	color,
	description,
	...rest
}: TBlockTile) => (
	<TilesList.ContentBlock
		{...rest}
		headline={headline ?? ''}
		amount={amount ?? ''}
		unit={unit ?? ''}
		icon={{ src: icon?.src ?? '', alt: icon?.alt ?? '' }}
		color={color}
		description={description && <RichTextBody html={description} />}
		image={
			<Image
				width={730}
				height={0}
				style={{ width: '100%', height: 'auto' }}
				src={image?.src ?? ''}
				alt={image?.alt ?? ''}
			/>
		}
	/>
)

const TextBlock = ({ topText, bottomText }: TText) => (
	<TilesList.ContentText
		topText={topText && <RichTextBody html={topText} />}
		bottomText={bottomText && <RichTextBody html={bottomText} />}
	/>
)

const QuoteBlock = ({ author, quote, topic }: TQuote) => (
	<TilesList.ContentQuote
		quote={<RichTextBody html={quote ?? ''} />}
		topic={topic ?? ''}
		author={<RichTextBody html={author ?? ''} />}
	/>
)

const TilesBlock = ({
	caption,
	title,
	imageAlign,
	splitterColor,
	backgroundColor,
	bottomColor,
	items,
}: TTilesListBlock) => {
	const alignBlock = useMemo(() => {
		if (items.length > 0 && items[0].type === EBlockType.ContentTile) {
			const tile = items[0] as unknown as TContentTile
			if (
				tile.items.length > 0 &&
				tile.items[0].type === EBlockContentType.Quote
			)
				return 'left'
		}

		return 'center'
	}, [items])

	return (
		<TilesList
			caption={caption}
			title={<RichTextTitle html={title ?? ''} />}
			imageAlign={imageAlign === EImageAlign.Left ? 'left' : 'right'}
			splitterColor={`#${splitterColor}`}
			backgroundColor={`#${backgroundColor}`}
			bottomColor={`#${bottomColor}`}
			align={alignBlock}
		>
			{items.map((item, index) => {
				return (
					<Fragment key={index}>
						{item.type === EBlockType.BlockTile && (
							<TilesList.Content>
								<ContentBlock {...item} />
							</TilesList.Content>
						)}
						{item.type === EBlockType.ContentTile && (
							<TilesList.Content
								key={index}
								image={
									item?.image?.src && (
										<Image
											src={item?.image?.src ?? ''}
											alt={item?.image?.alt ?? ''}
											width={400}
											height={0}
											style={{ width: '100%', height: 'auto' }}
										/>
									)
								}
							>
								{(item as TContentTile).items.map((content, index) => (
									<Fragment key={index}>
										{content.type === EBlockContentType.Text && (
											<TextBlock {...content} />
										)}
										{content.type === EBlockContentType.Quote && (
											<QuoteBlock {...content} />
										)}
									</Fragment>
								))}
							</TilesList.Content>
						)}
					</Fragment>
				)
			})}
		</TilesList>
	)
}

export default TilesBlock
