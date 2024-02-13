import {
	MediaBlockWithGraphics as MediaBlockWithGraphicsTemplate,
	RichTextTitle,
	RichTextBody,
} from '@diageo/designsystem'
import Image from 'next/image'
import { type TMediaBlockWithGraphics } from './TMediaBlockWithGraphics'

const MediaBlockWithGraphics = ({
	title,
	body,
	image,
}: TMediaBlockWithGraphics) => {
	return (
		<MediaBlockWithGraphicsTemplate
			heading={<RichTextTitle html={title} />}
			body={<RichTextBody html={body} />}
			background="linear-gradient(180deg, #FFF -3.16%, #F0DFF6 70.52%, #D0A9E9 111.85%)"
		>
			<Image src={image.url} alt={image.alt} width={680} height={500} />
		</MediaBlockWithGraphicsTemplate>
	)
}

export default MediaBlockWithGraphics
