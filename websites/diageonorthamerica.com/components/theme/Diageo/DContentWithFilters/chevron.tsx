import React from 'react'

export const Chevron = ({ isPrev }: { isPrev?: boolean }) => (
	<div className={`pagination__item__nav rotate__${isPrev ? 180 : 0}`}>
		{!isPrev && 'next'}
		<svg
			width="15"
			height="15"
			viewBox="0 0 6 10"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M5.99687 5L0.996875 10L0.296875 9.3L4.59688 5L0.296875 0.7L0.996875 0L5.99687 5Z"
				fill="black"
			/>
		</svg>
		{isPrev && 'prev'}
	</div>
)
