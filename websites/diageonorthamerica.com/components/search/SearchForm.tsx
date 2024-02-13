import React, { useState, useEffect } from 'react'
import { MicroPage } from 'types'
//import { fetchSearchResults } from 'lib/cms/api'
import Link from 'next/link'
import { fetchAutoComplete } from 'lib/cms/api'
import Icon from 'components/theme/plain/Icon'

export default function SearchForm() {
	// const [query, setQuery] = useState('')
	// const [active, setActive] = useState(false)
	// const [results, setResults] = useState<MiniPage[]>([])

	// useEffect(() => {
	//   if (query.length) {
	//     fetchSearchResults(query).then((ressy) => {
	//       setResults(ressy as MiniPage[])
	//     })
	//   } else {
	//     setResults([])
	//   }
	// }, [query])

	// const onChange = (event) => {
	//   setQuery(event.target.value)
	// }

	// const onFocus = () => {
	//   setActive(true)
	//   //window.addEventListener('click', onClick)
	// }

	// const onClick = useCallback((event) => {
	//   if (searchRef.current && !searchRef.current.contains(event.target)) {
	//     setActive(false)
	//     setQuery('')
	//     setResults([])
	//     window.removeEventListener('click', onClick)
	//   }
	// }, [])

	const [searchTerm, setSearchTerm] = useState('')
	const [autoComplete, setAutoComplete] = useState<MicroPage[]>([])

	useEffect(() => {
		if (searchTerm.length) {
			try {
				fetchAutoComplete(searchTerm).then((ressy) => {
					setAutoComplete(ressy as MicroPage[])
				})
			} catch (error) {
				console.error(error)
			}
		} else {
			setAutoComplete([])
		}
	}, [searchTerm])

	const handleSubmit = (e) => {
		e.preventDefault()
		setSearchTerm('')
		// router.push({
		//   pathname: `/search/${searchTerm}`,
		// })
	}

	return (
		<section className="promo-content">
			<div className="container">
				<div className="search-block">
					{/* <i className="s-interested"></i> */}

					<div className="s-wrapper">
						<div className="s-input">
							<form role="search" onSubmit={handleSubmit}>
								<div className="s-form">
									<label className="s-interested" htmlFor="search-input-form">
										I'm interested in...
									</label>
									<input
										id="search-input-form"
										type="text"
										name="q"
										placeholder="Search Diageo"
										className="s-keyword"
										aria-label="Search through site content"
										onChange={(e) => setSearchTerm(e.target.value)}
										value={searchTerm}
									></input>
								</div>
								<div className="s-submit">
									<button type="submit" aria-label="Search">
										<Icon
											name="icon_search"
											size="large"
											className="link__icon"
										/>
									</button>
								</div>
							</form>
						</div>
						{autoComplete.length > 0 && (
							<ul className="s-hint">
								{autoComplete.map((item) => {
									return (
										<li key={item._id}>
											<Link href={item.url}>{item.title}</Link>
										</li>
									)
								})}
							</ul>
						)}
					</div>
				</div>
			</div>
		</section>
	)
}
