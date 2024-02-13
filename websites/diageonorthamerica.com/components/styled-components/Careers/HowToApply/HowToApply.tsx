import { MilestonesBlockProps, MilestonesItem } from 'components/propTypes'
import ContentBounds from 'components/styled-components/Common/ContentBounds'
import IcoMoonIcon from 'components/theme/plain/IcoMoonIcon'
import { useState } from 'react'
import { FixMediaPathsInHtml, getVideoEmbedUrl } from 'utilities/functions'
import { Icons as EnumsIcon } from 'enumsIcon'
import Popup from 'reactjs-popup'

import * as S from './HowToApply.styles'

const HowToApply = (props: MilestonesBlockProps) => {
	const { blockItems } = props
	const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
	const [videoUrl, setVideoUrl] = useState<string>('')
	const videoParsed = getVideoEmbedUrl(videoUrl)
	return (
		<ContentBounds>
			<S.Wrapper>
				<Popup
					open={isOpenModal}
					className="video-popup"
					position="center center"
					closeOnEscape
					closeOnDocumentClick
				>
					<div>
						<button
							aria-label="Close"
							onClick={() => setIsOpenModal(false)}
							className="popup-content__close-btn"
						>
							<IcoMoonIcon icon={EnumsIcon.Close} size={24} color="#ffffff" />
						</button>
						<iframe
							src={videoParsed}
							frameBorder="0"
							allow="autoplay; encrypted-media"
							allowFullScreen
							title="video"
						/>
					</div>
				</Popup>
				{blockItems &&
					blockItems.length > 0 &&
					blockItems.map((s: MilestonesItem, index: number) => (
						<S.VerticalContainer key={index}>
							<S.QuoteWrapper>
								<S.QuoteContainer>
									<S.Quote
										dangerouslySetInnerHTML={{
											__html: FixMediaPathsInHtml(s.quoteText),
										}}
									/>
								</S.QuoteContainer>
								<S.HumanContainer>
									<S.HumanAvatarContainer>
										<S.HumanAvatar
											src={`${process.env.NEXT_PUBLIC_MEDIACROP}${process.env.NEXT_PUBLIC_MEDIAPREFIX}${s.authorImage?.url}`}
											layout="fill"
											alt={s.authorImage?.alt}
										/>
									</S.HumanAvatarContainer>
									<S.HumanDetailsContainer>
										<S.HumanNameContainer>
											<S.HumanName
												dangerouslySetInnerHTML={{
													__html: FixMediaPathsInHtml(s.authorName),
												}}
											/>
										</S.HumanNameContainer>
										<S.HumanPositionContainer>
											<S.HumanPosition>{s.authorSubtext}</S.HumanPosition>
										</S.HumanPositionContainer>
									</S.HumanDetailsContainer>
								</S.HumanContainer>
							</S.QuoteWrapper>
							<S.StepContainer>
								<S.StepWrapper>
									<S.StepNumber>{index + 1}</S.StepNumber>
								</S.StepWrapper>
								<S.StepLine />
							</S.StepContainer>
							<S.SectionWrapper>
								<S.SectionContentWrapper>
									<S.SectionTitleContainer>
										<S.SectionTitle>{s.itemTitle}</S.SectionTitle>
									</S.SectionTitleContainer>
									<S.SectionBodyContainer>
										<S.SectionBody
											dangerouslySetInnerHTML={{
												__html: FixMediaPathsInHtml(s.richTextBody),
											}}
										/>
									</S.SectionBodyContainer>
									{s.itemImage && (
										<>
											<S.MediaContainer
												onClick={() => {
													if (s.videoUrl) {
														setIsOpenModal(true)
														setVideoUrl(s.videoUrl)
													}
												}}
											>
												<S.StyledImage
													src={`${process.env.NEXT_PUBLIC_MEDIACROP}${process.env.NEXT_PUBLIC_MEDIAPREFIX}${s.itemImage?.url}`}
													alt={s.itemImage.alt}
													layout="fill"
												/>
												{s.videoUrl && (
													<IcoMoonIcon
														icon={EnumsIcon.Play}
														size={32}
														className="story-card__image-icon flex flex-align-center flex-justify-center"
														color="white"
													/>
												)}
											</S.MediaContainer>
											{s.itemImageCaption && (
												<S.MediaTextContainer>
													<S.MediaText
														dangerouslySetInnerHTML={{
															__html: FixMediaPathsInHtml(s.itemImageCaption),
														}}
													/>
												</S.MediaTextContainer>
											)}
										</>
									)}
									{/* {s.videoUrl && (
                    <div
                      onClick={() => {
                        setIsOpenModal(true)
                        setVideoUrl(s.videoUrl)
                      }}
                    >
                      <div>
                        <IcoMoonIcon
                          icon={EnumsIcon.Play}
                          size={32}
                          className="story-card__image-icon flex flex-align-center flex-justify-center"
                          color="white"
                        />
                      </div>
                    </div>
                  )} */}
								</S.SectionContentWrapper>
							</S.SectionWrapper>
						</S.VerticalContainer>
					))}
			</S.Wrapper>
		</ContentBounds>
	)
}

export default HowToApply
