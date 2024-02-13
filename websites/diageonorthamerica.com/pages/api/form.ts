import { NextApiRequest, NextApiResponse } from 'next'
import { Cidb } from 'lib/cidb-form/cidb-api-wrapper'

export default async function register(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	// TODO: get BrandID from CMS

	try {
		const reqObj = JSON.parse(req.body)
		const cidb = new Cidb()

		const cidbRes = await cidb.register({
			ConsumerProfile: {
				FirstName: reqObj.formData.firstName,
				LastName: reqObj.formData.lastName,
				DOB: reqObj.formData.dateOfBirth, // 1993-10-10
				PromoCode: [reqObj.promoCode],
				Email: [
					{
						EmailId: reqObj.formData.emailAddress,
						EmailCategory: 1,
						IsDefaultFlag: 1,
						ModifyFlag: 'I',
					},
				],
				Address: [
					{
						AddressType: 1,
						Address1: reqObj.formData.addressLine1,
						Address2: reqObj.formData.addressLine2,
						Address3: reqObj.formData.addressLine3,
						Address4: reqObj.formData.addressLine4,
						City: reqObj.formData.city,
						State: reqObj.formData.stateOfResidence,
						Country: reqObj.formData.countryOfResidence,
						ZipCode: reqObj.formData.zipCode,
						ModifyFlag: 'I',
					},
				],
				Phone: [
					{
						PhoneNumber: reqObj.formData.phoneNumber,
						PhoneType: 3,
						ModifyFlag: 'I',
					},
				],
			},
			Preferences: {
				QuestionCategory: [
					{
						CategoryID: 4,
						QuestionAnswers: [
							{
								QuestionID: 367,
								Answer: [
									{
										OptionID: 0,
										ModifyFlag: 'I',
										AnswerText: '9.8',
									},
								],
							},
						],
					},
					{
						CategoryID: 4,
						QuestionAnswers: [
							{
								QuestionID: 92,
								Answer: [
									{
										OptionID: 222,
										ModifyFlag: 'I',
										AnswerText: reqObj.formData.countryOfResidence,
									},
								],
							},
						],
					},
					{
						CategoryID: 1,
						QuestionAnswers: [
							{
								QuestionID: 64,
								Answer: [
									{
										OptionID: 99,
										ModifyFlag: 'I',
										BrandID: 251,
										CommunicationChannel: 1,
									},
								],
							},
						],
					},
				],
			},
		})

		if (cidbRes.success) {
			let hdrLoc = ''
			for (const hdr of cidbRes.res.headers.entries()) {
				if (hdr[0] === 'location') {
					hdrLoc = hdr[1]
				}
			}

			const rez = {
				success: cidbRes.success,
				res: hdrLoc,
			}

			return res.json(rez)
		}

		return res.json(cidbRes)
	} catch (err) {
		console.error('CIDB controller / Register', err)
		return res.json({
			success: false,
		})
	}
}
