import {
	type TFigure,
	RichTextTitle,
	Figures,
	RichTextBody,
} from '@diageo/designsystem'
import { type TFiguresBlock } from './TFiguresBlock'

const FiguresBlock = ({ caption, heading, items }: TFiguresBlock) => {
	const figures = items.map((item) => {
		const figure: TFigure = {
			progress: item.progress,
			description: <RichTextBody html={item.description} />,
			progressBackground:
				'linear-gradient(90deg, #D9112E 0.06%, #B4031D 0.07%, #FF6727 99.94%)',
			remainderBackground: '#E8E8E8',
			stat: {
				...item.stat,
				size: 'lg',
			},
		}
		return figure
	})

	return (
		<Figures
			items={figures}
			caption={caption}
			heading={<RichTextTitle html={heading} />}
		/>
	)
}

export default FiguresBlock
