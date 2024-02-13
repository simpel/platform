import React from 'react'

type DCategoriesFilterProps = {
	className?: string
}

function DFilterNewsListing({ className }: DCategoriesFilterProps) {
	return (
		<div className={`filter-news-listing ${className ? className : ''}`}></div>
	)
}

export default DFilterNewsListing
