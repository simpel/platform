import ContentBounds from 'components/styled-components/Common/ContentBounds'
import LayoutV2 from 'components/styled-components/Common/LayoutV2'
import { useState } from 'react'
import { FixMediaPathsInHtml } from 'utilities/functions'
import LinkHelper from 'components/theme/plain/custom/LinkHelper'
import * as S from './Accordions.styles'
import * as C from '../../Common/Layout/Layout.styles'
import {
	CareersAccordianBlockProps,
	CareersAccordianItem,
} from 'components/propTypes'
import { getGradient } from 'components/styled-components/utils'
import LinkHelper2 from 'components/theme/plain/custom/LinkHelper2'

interface IProgramme {
	location: string
	title: string
	isApplicationOpen: boolean
	openDate: string
	closeDate: string
	imageSrc: string
	imageAlt: string
	boldedText: string
	text: string
	applyHref: string
	learnMoreHref: string
}

// export interface IAccordionsProps {
//   title: string
//   programmes: IProgramme[]
// }

const Accordions = (props: CareersAccordianBlockProps) => {
	const { blockTitle, blockTheme, blockItems } = props

	const usedGradient = getGradient('EVP-Grad-03')

	const [isButtonHovered, setIsButtonHovered] = useState(false)
	const [isCollapsible, setIsCollapsible] = useState(false)
	const [expandedElements, setExpandedElements] = useState<any[]>([])

	const triggerStyle = {
		cursor: 'pointer',
		width: '100%',
	}

	const triggerProps = {
		triggerStyle,
		transitionTime: 300,
		easing: 'ease-in',
		width: '100%',
	}

	const addElementToExpandedList = (key: number) => {
		setExpandedElements([...expandedElements, key])
	}

	const removeElementFromExpandedList = (key: number) => {
		setExpandedElements([...expandedElements.filter((e) => e !== key)])
	}

	//const isOpened = (index: number) => expandedElements.find((x) => x === index)

	const renderAccesibilityRow = (isOpen: boolean, applicationsText: string) => {
		// const closeDateText = new Date(closeDate).toDateString()
		// const openDateText = new Date(openDate).toDateString()
		// const accesibilityText = isOpen ? (
		//   <>
		//     <S.BoldedText>Applications are now open. </S.BoldedText>
		//     <S.Text>Closing date: {closeDateText}</S.Text>
		//   </>
		// ) : (
		//   <>
		//     <S.Text>Applications will open in </S.Text>
		//     <S.BoldedText>{openDateText}</S.BoldedText>
		//   </>
		// )
		return (
			<>
				<S.AccesibilityCircleContainer>
					<S.AccesibilityCircle isOpen={isOpen} />
				</S.AccesibilityCircleContainer>
				<S.Accesibility
					dangerouslySetInnerHTML={{ __html: applicationsText }}
				></S.Accesibility>
			</>
		)
	}

	return (
		<LayoutV2>
			<ContentBounds>
				<S.Wrapper>
					<C.Column size={1} />
					<C.Column size={10}>
						<S.TitleWrapper>
							<S.Title
								dangerouslySetInnerHTML={{
									__html: FixMediaPathsInHtml(blockTitle),
								}}
							/>
						</S.TitleWrapper>
						<S.ProgrammesContainer>
							{blockItems &&
								blockItems.length > 0 &&
								blockItems.map((p: CareersAccordianItem, index: number) => {
									return (
										<div key={index}>
											<S.StyledCollapsible
												key={index}
												open={isCollapsible}
												onTriggerOpening={() => addElementToExpandedList(index)}
												onTriggerClosing={() =>
													removeElementFromExpandedList(index)
												}
												{...triggerProps}
												trigger={
													<LayoutV2 background={{ gradient: 'EVP-Grad-03' }}>
														<S.ProgrammeColoredContainer>
															<S.LeftContainer>
																<S.LocationContainer>
																	{p.location && (
																		<S.StyledLocationIcon
																			src={'/images/location-icon.svg'}
																			width={12}
																			height={16}
																			alt="Location icon"
																		/>
																	)}
																	<S.Location>{p.location}</S.Location>
																</S.LocationContainer>
																<S.ProgrammeTitleContainer>
																	<S.ProgrameeTitle>
																		{p.itemTitle}
																	</S.ProgrameeTitle>
																</S.ProgrammeTitleContainer>
															</S.LeftContainer>
															<S.RightContainer>
																<S.IconContainer>
																	<S.PlusMinus
																		className={
																			expandedElements.includes(index)
																				? 'active'
																				: ''
																		}
																	/>
																</S.IconContainer>
															</S.RightContainer>
														</S.ProgrammeColoredContainer>
													</LayoutV2>
												}
											>
												<S.ExpandedWrapper>
													<C.Column size={9}>
														<S.ExpandedLeftContainer>
															<S.ExpandedImageContainer>
																<S.ExpandedImage
																	src={`${process.env.NEXT_PUBLIC_MEDIACROP}${process.env.NEXT_PUBLIC_MEDIAPREFIX}${p.itemImage?.url}`}
																	fill
																	alt={p.itemImage?.alt}
																/>
															</S.ExpandedImageContainer>
															<S.ExpandedTextContainer>
																<S.ExpandedBoldText
																	dangerouslySetInnerHTML={{
																		__html: p.imageRichText,
																	}}
																></S.ExpandedBoldText>
															</S.ExpandedTextContainer>
															{p.jobId && p.jobId.length && (
																<S.ButtonContainer
																	onMouseOver={() => setIsButtonHovered(true)}
																	onMouseLeave={() => setIsButtonHovered(false)}
																	gradient={usedGradient}
																>
																	<S.Opacity isVisible={isButtonHovered} />
																	<S.StyledButton
																		href={
																			'/en/careers/search-and-apply?jobid=' +
																			p.jobId
																		}
																	>
																		Apply now
																	</S.StyledButton>
																</S.ButtonContainer>
															)}
														</S.ExpandedLeftContainer>
													</C.Column>
													<C.Column size={2} />
													<C.Column size={9}>
														<S.ExpandedRightContainer>
															<S.ExpandedTextContainer>
																<S.ExpandedText
																	dangerouslySetInnerHTML={{
																		__html: p.richTextBody,
																	}}
																></S.ExpandedText>
															</S.ExpandedTextContainer>
														</S.ExpandedRightContainer>
													</C.Column>
												</S.ExpandedWrapper>
											</S.StyledCollapsible>
											<S.ApplicationAccesibilityWrapper>
												<S.ApplicationAccesibilityContainer>
													{renderAccesibilityRow(p.greenDot, p.dotText)}
												</S.ApplicationAccesibilityContainer>
											</S.ApplicationAccesibilityWrapper>
										</div>
									)
								})}
						</S.ProgrammesContainer>
					</C.Column>
					<C.Column size={1} />
				</S.Wrapper>
			</ContentBounds>
		</LayoutV2>
	)
}

export default Accordions
