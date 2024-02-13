import { SplitCard, RichTextBody } from '@diageo/designsystem'
import Image from 'next/image'
import { type TSplitCard } from './TSplitCard'

const SplitCardBlock = ({
	backgroundColor,
	disclaimer,
	image,
	text,
	title,
}: TSplitCard) => {
	return (
		<SplitCard
			image={<Image fill src={image?.src ?? ''} alt={image?.alt ?? ''} />}
			title={title}
			body={<RichTextBody html={text} />}
			disclaimer={<RichTextBody html={disclaimer} />}
			background={`linear-gradient(125deg, #FFF1D7 0%, #${backgroundColor} 98.9%)`}
		/>
	)
}

export default SplitCardBlock
