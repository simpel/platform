import React from 'react'

type ResultItemProps = {
	url: string
	title: string
	tags?: string[]
	selected?: boolean
	onClick: (e) => void
}

export default function ContentListItem({
	url,
	title,
	tags,
	selected,
	onClick,
}: ResultItemProps) {
	return (
		<a
			href={url}
			className={`vacancy ${selected && 'selected'}`}
			onClick={onClick}
		>
			<div className="vacancy-border"></div>
			<div className="vacancy-content">
				{title && <h4 className="vacancy-title">{title}</h4>}
				<div className="vacancy-tags">
					{tags &&
						tags.map((tag, index) => (
							<span className="vacancy-tag" key={tag}>
								{tag}&nbsp;{index !== tags.length - 1 && <span>|&nbsp;</span>}
							</span>
						))}
				</div>
			</div>
		</a>
	)
}
