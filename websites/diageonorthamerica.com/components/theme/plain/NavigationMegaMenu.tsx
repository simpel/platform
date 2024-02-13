import { renderBlock } from 'components'
import React from 'react'
import { classnames as cn } from 'tailwindcss-classnames'

import { ContentBlock } from 'types'

type Props = {
	visible?: boolean
	blocks?: ContentBlock[]
}

export default function NavigationMegaMenu({
	visible,
	blocks,
	...rest
}: Props &
	React.DetailedHTMLProps<
		React.HTMLAttributes<HTMLDivElement>,
		HTMLDivElement
	>) {
	if (!blocks || !blocks.length) return null
	const promoboxes = blocks.filter(
		({ contentType }) => contentType === 'promoBox',
	)
	const links = blocks.filter(({ contentType }) => contentType !== 'promoBox')

	return (
		<div
			className={cn(
				'fixed',
				'left-0',
				'px-4',
				'py-8',
				'bg-gray-800',
				'rounded',
				'rounded-t-none',
				'shadow-xl',
				'right-0',
				visible ? 'visible' : 'invisible',
				'top-10',
			)}
			style={{ margin: 0 }}
			{...rest}
		>
			<div className="grid grid-flow-col auto-cols-auto">
				<div className="pr-4">
					{promoboxes.map((block) =>
						renderBlock(block, { container: 'megaMenu' }, 'navigationPromoBox'),
					)}
				</div>
				{!!links.length && (
					<div className="flex flex-col pl-4 border-l-2 border-gray-700">
						{links.map((block) => (
							<div key={block.key} className="mb-4">
								{renderBlock(block, { container: 'megaMenu' })}
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	)
}
