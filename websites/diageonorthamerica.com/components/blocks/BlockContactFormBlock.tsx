import process from 'process'
import { useFields } from 'context/fields'
import { getComponent } from 'components'
import {
	type BlockProps,
	type ContactFormBlockProps,
} from 'components/propTypes'
import { Block } from 'enums'
import { getEmailTargets } from 'utilities/getEmailTargets/getEmailTargets'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'

export default function BlockContactFormBlock({
	customComponent,
}: BlockProps<ContactFormBlockProps>) {
	const [f] = useFields()
	const componentIdentifier = f.text('componentIdentifier')

	const emailTargets = getEmailTargets(f.fields)

	const props = {
		introText: f.html('introText'),
		completedText: f.html('completedText'),
		targets: emailTargets,
	}

	const renderContent = () => {
		return getComponent<ContactFormBlockProps>(
			Block.ContactFormBlock,
			props,
			componentIdentifier,
			customComponent,
		)
	}

	return (
		<GoogleReCaptchaProvider
			reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
			scriptProps={{
				async: true,
				defer: true,
				appendTo: 'head',
			}}
		>
			{renderContent()}
		</GoogleReCaptchaProvider>
	)
}
