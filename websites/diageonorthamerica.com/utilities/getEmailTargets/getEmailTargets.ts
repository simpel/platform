import { type ContactFormTargetItem } from 'components/propTypes'
import { type Field } from 'types'
import { encrypt } from 'utilities/encryption'
import { getContentBasedOnKey } from 'utilities/getContentBasedOnKey/getContentBasedOnKey'
import l from 'utilities/l'

export const getEmailTargets = (
	targetFields?: Field[],
): ContactFormTargetItem[] => {
	const contentFields = getContentBasedOnKey<Field>(
		'alias',
		'blocks',
		targetFields,
	)

	if (!contentFields?.blocks) return []

	const targets: ContactFormTargetItem[] = []

	for (const block of contentFields.blocks) {
		const option = getContentBasedOnKey<Field>('alias', 'option', block.fields)
			?.text

		const emailTargets = getContentBasedOnKey<Field>(
			'alias',
			'emailTargets',
			block.fields,
		)?.text

		if (option && emailTargets) {
			const targetItem: ContactFormTargetItem = {
				option,
				emailTargets: `${encrypt(emailTargets)}`,
			}

			targets.push(targetItem)
		}
	}

	l('targets', targets)

	return targets
}
