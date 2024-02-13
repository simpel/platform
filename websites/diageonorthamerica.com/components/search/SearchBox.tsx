import React, { useEffect, useState } from 'react'
import { MiniPage } from 'types'
import { fetchSearchResultsDocType } from 'lib/cms/api'
import DCard from 'components/theme/Diageo/cards/DCard'
import { HeadingLevel } from 'enums'

function SearchBox() {
	const [query, setQuery] = useState('')
	const [active, setActive] = useState(false)
	const [results, setResults] = useState<MiniPage[]>([])

	// const categories =
	//   '18047b7a276d70429eb76ece,9430a0547efcf64e927bb7b7,d6c2fc812929a149b1d47b03,d9a159622d007348855bcd8e,baf6d338d012954c8a706be4,a0d1a0cb9883a1489387374d'

	//const contentType = 'pressReleasePage'
	const contentType = ''
	useEffect(() => {
		if (query.length) {
			fetchSearchResultsDocType(contentType, query, 100).then((ressy) => {
				setResults(ressy as MiniPage[])
			})
		} else {
			setResults([])
		}
	}, [query])

	const onChange = (event) => {
		setQuery(event.target.value)
	}

	const onChangeNull = (event) => {
		//setQuery(event.target.value)
	}

	const PageTypes = {
		boardMemberPage: 'Board Member',
		boardMembersPage: '',
		brandLandingPage: '',
		brandPage: 'Brand page',
		careersLandingPage: '',
		careersSearchPage: '',
		textPage: 'Content page',
		countryPage: 'Country page',
		featurePage: 'Story',
		featureYearPage: '',
		featuresLandingPage: '',
		financialCalendarPage: 'Financial Calendar',
		homePage: 'Home page',
		jobDetailsPage: '',
		landingPage: '',
		leftNavPage: 'Content page',
		locationsPage: 'Location',
		mediaLandingPage: '',
		investorReleaseLandingPage: '',
		pressReleaseLandingPage: '',
		pressReleasePage: 'Press Release',
		pressReleaseYearPage: '',
		regionPage: 'Region',
		resultsPresentationsPage: 'Results & Presentations',
		searchPage: 'Search',
		societyLandingPage: '',
		societyPage: 'Society 2030',
		careersArticleLandingPage: '',
		careersArticlePage: 'Content Page',
		careersArticleYearPage: '',
		videoLandingPage: '',
		videoPage: 'Video',
	}
	// const submitContact = async (event) => {
	//   event.preventDefault()
	//   alert(`So your name is ${event.target.name.value}?`)
	// }

	const onFocus = () => {
		setActive(true)
		//window.addEventListener('click', onClick)
	}
	const dimensions = {
		styleDesk: '',
		widthDesk: 400,
		heightDesk: 300,
		pureimage: false,
	}

	return (
		<section className="block-stories">
			<div className="container">
				<h3>This search form brings back results as you type</h3>
				<p>
					{' '}
					{/* <form onSubmit={submitContact}> */}
					<span className="search-icon"></span>
					<input
						type="text"
						placeholder="Search"
						onChange={onChange}
						onFocus={onFocus}
						value={query}
					/>
					{/* <input
                type="text"
                name="searchtext"
                onChange={onChangeNull}
                onFocus={onFocus}
                placeholder="Search"
                value={query}
              /> */}
					{/* <input type="submit" value="Search" onClick={onChange} />
            </form> */}
				</p>
				<div className="block-stories__list-stories">
					{active &&
						results &&
						results.length > 0 &&
						results.map((card, i) => (
							<div key={i} className="block-stories__list-stories-col">
								<DCard
									_id={card._id}
									image={{
										_id: card._id,
										url: card.pageListingImage?.url
											? card.pageListingImage.url
											: '',
										alt: card?.metaDescription,
									}}
									linkUrl={card.url}
									title={card.title}
									headingLevel={HeadingLevel.H4}
									date={card?.articleDate}
									tags={[]}
									className="card-latest-story"
									typeCard={PageTypes[card.contentType]}
									dimensions={dimensions}
								/>
							</div>
						))}
				</div>
				{/* {active &&
              results &&
              results.length > 0 &&
              results.map((value, i) => {
                return (
                  <div key={i}>
                    <Link href={value.url}>
                      <a>{value.title}</a>
                    </Link>
                    <p>
                      {value.metaDescription} {value.articleDate}
                    </p>
                    {value.pageListingImage && value.pageListingImage.url && (
                      <ImageBlock
                        image={{ _id: value.pageListingImage._id, url: value.pageListingImage.url, alt: '' }}
                        dimensions={dimensions}
                      />
                    )}
                  </div>
                )
              })} */}
			</div>
		</section>
	)
}

export default SearchBox
