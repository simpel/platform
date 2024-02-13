import LayoutV2 from 'components/styled-components/Common/LayoutV2'
import ContentBounds from 'components/styled-components/Common/ContentBounds'
import { FixMediaPathsInHtml } from 'utilities/functions'
import * as S from './ArticleHeaders.styles'
import * as C from '../../Common/Layout/Layout.styles'
import { useMediaQuery } from 'react-responsive'

interface ITag {
	text: string
	href: string
}
export interface IArticleHeaderProps {
	gradient: any
	date: string
	header: string
	tags: ITag[]
	imageSrc?: string
	imageAlt?: string
}
const ArticleHeader = (props: IArticleHeaderProps) => {
	const { gradient, date, header, tags, imageSrc, imageAlt } = props
	const isTablet = useMediaQuery({ query: '(min-width: 768px)' })
	return (
		<LayoutV2
			background={{
				gradient,
				alignment: 'left',
				viewWidth: !isTablet ? 100 : isTablet && imageSrc ? 70 : 100,
			}}
		>
			<ContentBounds>
				<S.Wrapper>
					<C.Column size={6}>
						<S.LeftSide>
							<S.UpperContainer>
								{isTablet && (
									<>
										<C.Column size={5}>
											{/* <div className="breadcrumbs">
                        <ul className="breadcrumbs__list bare-list flex flex-wrap">
                          <BreadcrumbsHelper breadcrumbs={breadcrumbs}></BreadcrumbsHelper>
                        </ul>
                      </div> */}
										</C.Column>
										<C.Column size={1} />
									</>
								)}
							</S.UpperContainer>
							<S.BottomContainer>
								{isTablet && <C.Column size={1} />}
								<C.Column size={4}>
									<S.ContentContainer>
										<S.DateContainer>
											<S.Date
												dangerouslySetInnerHTML={{
													__html: FixMediaPathsInHtml(date),
												}}
											/>
										</S.DateContainer>
										<S.HeaderContainer>
											<S.StyledHeader
												dangerouslySetInnerHTML={{
													__html: FixMediaPathsInHtml(header),
												}}
											/>
										</S.HeaderContainer>
										<S.TagWrapper>
											{tags &&
												tags.length > 0 &&
												tags.map((t: ITag, index: number) => (
													<S.TagContainer key={index}>
														<S.Tag>{t.text}</S.Tag>
													</S.TagContainer>
												))}
										</S.TagWrapper>
									</S.ContentContainer>
								</C.Column>
							</S.BottomContainer>
						</S.LeftSide>
					</C.Column>
					<C.Column size={1} />
					<C.Column size={6}>
						{imageSrc && (
							<S.RightSide>
								<S.ImageContainer>
									<S.StyledImage src={imageSrc} fill alt={imageAlt} />
								</S.ImageContainer>
							</S.RightSide>
						)}
					</C.Column>
				</S.Wrapper>
			</ContentBounds>
		</LayoutV2>
	)
}

export default ArticleHeader
