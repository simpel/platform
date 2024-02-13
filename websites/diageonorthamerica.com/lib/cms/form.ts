import { fieldMappings } from 'lib/cidb-form/utils'
import { ContentBlock, FieldSource, Page } from 'types'
import { parseFields } from './field-utils'

export function formBlocks(blocks: ContentBlock[] = [], page: Page) {
	const formFields: FieldSource[] = []

	blocks
		.filter(({ contentType }) => contentType.includes('FormField'))
		.map((block) => {
			const fieldName = block.contentType.replace('FormField', '')
			const fieldData = fieldMappings.find(({ name }) => name === fieldName)
			let options

			if (!fieldData || !fieldData.field) return

			let maxLength: number | undefined =
				block.fields.find(({ alias }) => alias === 'maxLength')?.number || 0
			if (maxLength === 0) maxLength = undefined

			const f = parseFields(block.fields, {})

			const dataS = block.fields.find(({ alias }) => alias === 'dropdownItems')
				?.content

			if (dataS && dataS.contentType === 'basicDataSource') {
				const dataRefId = dataS._id

				options = page.referencedContent.filter((content) => {
					return (
						content.contentType === 'basicDataSource' &&
						content._id === dataRefId
					)
				})

				const of = parseFields(options[0].fields, {})
				const items = of.blocks('items')

				for (const item of items) {
					const opt = parseFields(item.fields, {})
					const optLbl = opt.text('itemLabel')
					const optVal =
						fieldName === 'countryOfResidence'
							? opt.text('itemAlias')
							: opt.text('itemValue')
					options.push({
						label: optLbl,
						value: optVal,
					})
				}
			}

			formFields.push({
				name: fieldData.name,
				label: f.html('displayLabel'),
				placeholder: f.text('placeholderText'),
				required: f.boolean('isRequired'),
				maxLength: maxLength,
				max: fieldData.type === 'date' ? '9999-01-01' : undefined,
				type: fieldData.type,
				value: fieldData.value,
				accept: f.boolean('imageOnly') ? 'image/*' : undefined,
				awsAccessKeyId: f.text('awsAccessKeyId'),
				awsSecretAccessKey: f.text('awsSecretAccessKey'),
				s3BucketName: f.text('s3BucketName') || undefined,
				s3Path: f.text('s3Path') || undefined,
				options: options || undefined,
			})
			// TODO:
			/* fieldData.extras?.map((e) => formFields.push(e)) */

			const brand = f.number('brand')
			const channel = f.number('channel')
			if (fieldName === 'marketingOptIn') {
				if (brand)
					formFields.push({
						name: `${fieldData.name}___brand`,
						value: brand.toString(),
						type: 'hidden',
					})
				if (channel)
					formFields.push({
						name: `${fieldData.name}___channel`,
						value: channel.toString(),
						type: 'hidden',
					})
			}
		})
	return formFields
}
