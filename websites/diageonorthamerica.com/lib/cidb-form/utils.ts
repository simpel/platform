import { FormNamePair } from 'types'

export const fieldMappings: FormNamePair[] = [
	{
		name: 'fileUpload',
		// TODO:
		field: 'file_tbd',
		type: 'file',
	},
	{
		name: 'firstName',
		field: 'CP_FirstName',
		type: 'text',
	},
	{
		name: 'lastName',
		field: 'CP_LastName',
		type: 'text',
	},
	{
		name: 'dateOfBirth',
		field: 'CP_DOB',
		type: 'date',
	},
	{
		name: 'emailAddress',
		field: 'CP_EmailId',
		type: 'email',
		extras: [
			{
				name: 'HD_EmailType',
				value: '1',
				type: 'hidden',
			},
		],
	},
	{
		name: 'phoneNumber',
		field: 'CP_PhoneNumber',
		type: 'tel',
		extras: [
			{
				name: 'HD_PhoneType',
				value: '3',
				type: 'hidden',
			},
		],
	},
	{
		name: 'addressLine1',
		field: 'CP_Address1',
		type: 'text',
		extras: [
			{
				name: 'HD_AddressType',
				value: '1',
				type: 'hidden',
			},
		],
	},
	{
		name: 'addressLine2',
		field: 'CP_Address2',
		type: 'text',
	},
	{
		name: 'addressLine3',
		field: 'CP_Address3',
		type: 'text',
	},
	{
		name: 'addressLine4',
		field: 'CP_Address4',
		type: 'text',
	},
	{
		name: 'city',
		// TODO:
		field: 'city_tbd',
		type: 'text',
	},
	{
		name: 'stateOfResidence',
		// TODO:
		field: 'state_tbd',
		type: 'select',
	},
	{
		name: 'countryOfResidence',
		field: 'CP_Country',
		type: 'select',
	},
	{
		name: 'zipCode',
		field: 'CP_ZipCode',
		type: 'text',
	},
	{
		name: 'competitionQuestion',
		field: 'PR_4_269_1_freetext',
		type: 'text',
	},
	{
		name: 'purchaseLocationQuestion',
		field: 'PR_4_269_1_freetext',
		type: 'text',
	},
	{
		name: 'genericText',
		field: 'PR_4_269_1_freetext',
		type: 'text',
	},
	{
		name: 'marketingOptIn',
		field: 'PR_1_64_1',
		type: 'checkbox',
		value: '1',
	},
	{
		name: 'termsAgreement',
		field: 'terms',
		type: 'checkbox',
		value: '1',
	},
]
