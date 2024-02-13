import React from 'react'

import { useFields } from 'context/fields'
import { renderBlocks } from 'components'
import { RenderSettings } from 'types'

import Layout from 'components/Layout'

//
export default function PageCareers() {
	const [f] = useFields()
	const renderSettings: RenderSettings = { location: 'header' }
	const header = renderBlocks(f.blocks('headerContent'), renderSettings)
	const body = renderBlocks(f.blocks('body'))

	return (
		<Layout>
			{header}
			{body}

			<style jsx>{`
				.career-search-form {
					width: 496px;
				}
				form fieldset {
					border: 1px solid #000000;
					padding: 32px 48px;
					margin: 0;
				}
				form .form-field + .form-field {
					margin-top: 16px;
				}
				form button[type='submit'] {
					margin-top: 32px;
				}
				.career-search-form .form-title {
					background: inherit;
					font-weight: 400;
					font-size: 26px;
					line-height: 1;
					padding: 0px 20px;
					margin-left: -20px;
				}
			`}</style>
		</Layout>
	)
}
