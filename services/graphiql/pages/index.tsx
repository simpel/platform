import { createGraphiQLFetcher } from '@graphiql/toolkit'
import { GraphiQL } from 'graphiql'
import React, { useEffect, useState } from 'react'
import { explorerPlugin } from '@graphiql/plugin-explorer'

import 'graphiql/graphiql.css'

export default function GraphQL() {
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		if (process.env.API_URL && process.env.API_KEY) {
			console.error()
		}
		setMounted(true)
	}, [])

	if (mounted) {
		const fetcher = createGraphiQLFetcher({ url: 'api/graphiql' })
		const explorer = explorerPlugin({ showAttribution: true })
		return (
			<div className="graphiql">
				<GraphiQL fetcher={fetcher} plugins={[explorer]} />
			</div>
		)
	}

	return null
}
