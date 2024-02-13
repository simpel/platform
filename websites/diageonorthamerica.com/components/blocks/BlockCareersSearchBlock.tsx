import { useFields } from 'context/fields'
import { getComponent } from 'components'
import { BlockProps, CareersSearchBlockProps } from 'components/propTypes'
import { Block } from 'enums'

export default function BlockCareersSearchBlock({
	customComponent,
}: BlockProps<CareersSearchBlockProps>) {
	const [f] = useFields()

	const componentIdentifier = f.text('componentIdentifier')

	const props = {
		blockTitle: f.text('blockTitle'),
		buttonUrl: f.text('buttonUrl'),
		buttonText: f.text('buttonText'),
		hashTagText: f.text('hashtagText'),
		hashtagLink: f.text('hashtagLink'),
		instagramLink: f.text('instagramLink'),
		linkedinLink: f.text('linkedinLink'),
		gradient: 'EVP-Grad-07',
	}

	return getComponent<CareersSearchBlockProps>(
		Block.CareersSearchBlock,
		props,
		componentIdentifier,
		customComponent,
	)
}
