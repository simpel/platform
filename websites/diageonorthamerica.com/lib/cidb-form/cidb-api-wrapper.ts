import fetch, { RequestInit } from 'node-fetch'

// TODO: get appId from CMS
const appId = '9201131'

type CidbRegister = {
	ConsumerProfile: {
		FirstName: string
		LastName: string
		DOB: string // 1993-10-10
		PromoCode: string[]
		Email: Array<{
			EmailId: string
			EmailCategory: 1
			IsDefaultFlag: 1
			ModifyFlag: 'I'
		}>
		Address?: Array<{
			AddressType: 1
			Address1: string
			Address2: string
			Address3: string
			Address4: string
			City: string
			State: string
			Country: string
			ZipCode: string
			ModifyFlag: 'I'
		}>
		Phone?: [
			{
				PhoneNumber: string
				PhoneType: 3
				ModifyFlag: 'I'
			},
		]
	}
	Preferences: {
		QuestionCategory: Array<{
			CategoryID: number
			QuestionAnswers: Array<{
				QuestionID: number
				Answer: Array<{
					OptionID: number
					ModifyFlag: 'I'
					AnswerText?: string
					BrandID?: number
					CommunicationChannel?: number
				}>
			}>
		}>
	}
}

export class Cidb {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	async register(data: CidbRegister): Promise<{ success: boolean; res: any }> {
		// console.log('Cidb submit body: ', JSON.stringify(data))
		try {
			const cidbRes = await this.request('consumers', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: '*/*',
				},
				body: JSON.stringify(data),
			}).then((res) => {
				return res
			})

			if (cidbRes.status === 201) {
				return {
					success: true,
					res: cidbRes,
				}
			} else {
				console.warn('Cidb register error', cidbRes)
				const err = cidbRes
				return {
					success: false,
					res: err.statusText,
				}
			}
		} catch (err) {
			console.warn(err)
			return {
				success: false,
				res: err.message,
			}
		}
	}

	private async request(route: string, options?: RequestInit) {
		return fetch(`${this.host()}/${appId}/2.0/${route}`, options)
	}

	private host(): string {
		switch (process.env.CIDB_ENV) {
			case 'production':
				return 'https://neowebservices.diageo.com/neowebservices'
			case 'test':
				return 'https://neowebservices-dev.diageo.com/neowebservices'
			case 'dev':
			case 'staging':
			default:
				return 'https://neowebservices-staging.diageo.com/neowebservices'
		}
	}
}
