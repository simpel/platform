import { HeroGraphs, RichTextTitle } from '@diageo/designsystem'
import Image from 'next/image'
import { type THeroWithGraphs } from './THeroWithGraphs'

const HeroWithGraphs = ({ title, img, alt }: THeroWithGraphs) => (
	<HeroGraphs
		title={<RichTextTitle html={title} />}
		background={<Image fill src={img} alt={alt} />}
	/>
)

export default HeroWithGraphs
