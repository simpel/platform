import React from 'react'
import { AnchorTargetBlockProps } from '../../../components/propTypes'

export default function AnchorTargetBlock({
	anchorID,
}: AnchorTargetBlockProps) {
	const theid = 'ANCH' + anchorID.toLowerCase()
	return <div className="anchor-target" id={theid}></div>
}
