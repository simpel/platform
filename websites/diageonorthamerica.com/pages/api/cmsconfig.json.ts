import { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'

import { Block } from 'enums'
import { runMiddleware } from 'lib/api-utils'

const cors = Cors({
	methods: ['GET', 'HEAD'],
	origin: [
		'https://global-cms.thoriumd.com',
		'https://cms-diageocms.diageoplatform.com',
		'https://cms.diageocms.com',
	],
})

export default async function register(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	await runMiddleware(req, res, cors)

	return res.json({
		styles: [
			// {
			//   alias: 'big',
			//   name: 'Big',
			//   icon: 'icon-tag color-red',
			//   includeBlockTypes: ['followUs', 'keyValuePair'],
			// },
			// {
			//   alias: 'small',
			//   name: 'Small',
			//   icon: 'icon-tag color-blue',
			//   excludeBlockTypes: ['keyValuePair'],
			// },
			{
				alias: 'stacked',
				name: 'Stacked',
				icon: 'icon-tag color-blue',
				includeBlockTypes: [Block.Button],
			},
			{
				alias: 'fullWidth',
				name: 'Full Width',
				icon: 'icon-tag color-blue',
				includeBlockTypes: [Block.Button, Block.Image],
			},
		],
		groups: [
			{
				title: 'Button styles',
				includeBlockTypes: ['imageBlock'],
				styles: [
					{
						alias: 'primary',
						name: 'Primary',
						icon: 'icon-tag color-red',
					},
					{
						alias: 'secondary',
						name: 'Secondary',
						icon: 'icon-tag color-blue',
					},
				],
			},
		],
		crops: [
			{
				alias: '16by9',
				name: '16:9',
				ratio: 1.7778,
			},
			{
				alias: '4by3',
				name: '4:3',
				ratio: 1.3333,
			},
			{
				alias: '1by1',
				name: 'Square',
				ratio: 1,
			},
		],
	})
}
