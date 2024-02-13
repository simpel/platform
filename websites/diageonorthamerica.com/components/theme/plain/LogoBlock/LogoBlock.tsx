import { LogoBlock as Template, RichTextTitle } from '@diageo/designsystem'
import Image from 'next/image'
import Link from 'next/link'
import { type TLogoBlock } from './TLogoBlock'

const LogoBlock = ({ title, items, backgroundColor }: TLogoBlock) => {
	return (
		<Template
			title={<RichTextTitle html={title ?? ''} />}
			backgroundColor={
				backgroundColor &&
				`linear-gradient(175deg, #FFF 5.39%, #${backgroundColor} 93.17%)`
			}
			logos={
				items?.map((item, index) => {
					if (item.link?.href) {
						return (
							<Link
								key={index}
								href={item.link.href}
								{...item.link}
								rel="noopener noreferrer"
							>
								<Image fill src={item.image.src} alt={item.image.alt} />
							</Link>
						)
					}

					return (
						<Image key={index} fill src={item.image.src} alt={item.image.alt} />
					)
				}) ?? []
			}
		/>
	)
}

export default LogoBlock
