import React, { useState } from 'react'
import { SelectOption, Image as ImageType, CmsLink, MicroPage } from 'types'
import Select from './Select'
import Image from './Image'
import DContainer from '../Diageo/DContainer'
import cn from 'classnames'
import Heading from './Heading'
import { HeadingLevel } from 'enums'
import BreadcrumbsHelper from './custom/BreadcrumbHelper'
import LinkHelper2 from '../plain/custom/LinkHelper2'

type StateType = {
	search: string
	type?: SelectOption
	year?: SelectOption
}

const initialState = {
	search: '',
	type: {
		value: '',
		label: '',
	},
	year: {
		value: '',
		label: '',
	},
} as StateType

function AnnualReportBlock({
	years,
	types,
	title,
	image,
	titleSecondary,
	subtitle,
	breadcrumbs,
	link,
	onChange,
}: {
	years: SelectOption[]
	types: SelectOption[]
	search?: string
	title: string
	titleSecondary?: string
	subtitle?: string
	image?: ImageType
	link?: CmsLink | null
	breadcrumbs: MicroPage[]
	onChange: (T) => void
}) {
	const [state, setState] = useState<StateType>(initialState)
	const [searchVal, setSearchVal] = useState<string>('')
	const dimensions = {
		styleDesk: 'fit-to-object',
		widthDesk: 656,
		heightDesk: 370,
		pureimage: true,
	}
	const typeClassBlock = cn({
		'presentation-block--with-image': image && image.url,
	})

	const onSelectChange = (selectedOption: SelectOption, select) => {
		setSearchVal('')
		const { name } = select

		const objData = {
			...state,
			[name]: selectedOption || { value: '', label: '' },
			search: searchVal,
		}

		setState(objData)
		onChange(objData)
	}

	const handleInputClick = (value) => {
		const objData = { ...initialState, search: value }
		setState(objData)
		setSearchVal(value)
		onChange(objData)
	}

	return (
		<section
			className={`presentation-block ${typeClassBlock ? typeClassBlock : ''}`}
		>
			<div className="offset-bg--reset"></div>
			<DContainer className="presentation-block__container">
				<>
					<div className="breadcrumbs">
						<ul className="breadcrumbs__list bare-list flex flex-wrap">
							<BreadcrumbsHelper breadcrumbs={breadcrumbs}></BreadcrumbsHelper>
						</ul>
					</div>

					<div className="presentation-block__body">
						<div className="presentation-block__right-col">
							<div className="presentation-block__media">
								{image && image.url ? (
									<div className="presentation-block__image img-wrapper">
										<Image image={image} dimensions={dimensions} />
									</div>
								) : null}
								<div className="presentation-block__media-content">
									{titleSecondary && (
										<Heading
											heading={titleSecondary}
											headingLevel={HeadingLevel.H2}
											className="presentation-block__title-secondary"
										/>
									)}
									{subtitle && (
										<p className="presentation-block__subtitle text-uppercase">
											{subtitle}
										</p>
									)}
									<div className="presentation-block__button-wrapper text-align--center">
										{link && (
											<LinkHelper2
												name={link.name}
												url={link.url}
												contentId={link.contentId}
												mediaId={link.mediaId}
												target={link.target}
												linkClass={'link'}
												divClass={'link__inner'}
												showicon={true}
												size={'large'}
											/>
										)}
									</div>
								</div>
							</div>
						</div>

						<div className="presentation-block__left-col">
							<Heading
								heading={title}
								headingLevel={HeadingLevel.H2}
								className="h1"
							/>

							<div className="search-report-block">
								{/* <SearchInput
                  reversed
                  name="search"
                  size="large"
                  placeholder="Search archive"
                  buttonOnClick={handleInputClick}
                /> */}
							</div>
							<div className="selects-report-block">
								<Select
									name="type"
									placeholder="Type"
									options={types || []}
									value={state.type}
									onChange={onSelectChange}
									isClearable={true}
								/>
								<Select
									name="year"
									placeholder="Year"
									options={years || []}
									value={state.year}
									onChange={onSelectChange}
									isClearable={true}
								/>
							</div>
						</div>
					</div>
				</>
			</DContainer>
		</section>
	)
}

export default AnnualReportBlock
