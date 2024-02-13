import React from 'react'

type AsideStoryProps = {
	title: string
	heading: string
	border?: boolean
}

function AsideStory({ title, heading, border }: AsideStoryProps) {
	return (
		<div className={`aside-story ${border ? 'aside-story--with-border' : ''}`}>
			{title && (
				<h6 className="aside-story__title text-uppercase font-normal">
					{title}
				</h6>
			)}
			{heading && <h4 className="aside-story__heading">{heading}</h4>}
		</div>
	)
}

export default AsideStory
