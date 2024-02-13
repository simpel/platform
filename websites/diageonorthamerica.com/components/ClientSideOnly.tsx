import React, { PropsWithChildren, useEffect, useState } from 'react'

/**
 * Render children client-side only.
 * From https://github.com/vercel/next.js/issues/2473
 */
function ClientSideOnly({
	children,
	...delegated
}: PropsWithChildren<unknown>) {
	const [hasMounted, setHasMounted] = useState(false)

	useEffect(() => {
		setHasMounted(true)
	}, [])

	if (!hasMounted) {
		return null
	}

	return <div {...delegated}>{children}</div>
}

export default ClientSideOnly
