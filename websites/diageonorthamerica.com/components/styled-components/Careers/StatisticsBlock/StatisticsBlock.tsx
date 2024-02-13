import ContentBounds from 'components/styled-components/Common/ContentBounds'
import LayoutV2 from 'components/styled-components/Common/LayoutV2'
import LinkHelper from 'components/theme/plain/custom/LinkHelper'
import { FixMediaPathsInHtml } from 'utilities/functions'
import * as S from './StatisticsBlock.styles'
import * as C from '../../Common/Layout/Layout.styles'

export interface IStatistic {
	value: string
	title: string
}

export interface IStatisticsBlockProps {
	pageTitle: string
	title: string
	buttonText: string
	buttonHref: string
	gradient: string
	statistics: IStatistic[]
	isMediaVisible?: boolean
	image1: string
	alt1: string
}

const StatisticsBlock = (props: IStatisticsBlockProps) => {
	const {
		pageTitle,
		title,
		buttonText,
		buttonHref,
		gradient,
		statistics = [],
		isMediaVisible,
		image1,
		alt1,
	} = props
	const leftStats = statistics.slice(0, 2) || []
	const rightStats = statistics.slice(2) || []
	return (
		<LayoutV2
			background={{
				gradient,
			}}
		>
			<ContentBounds>
				<S.Wrapper>
					<C.Column size={1} />
					<C.Column size={4} isCentered={true}>
						<S.ContentContainer>
							<S.PageTitleContainer>
								<S.PageTitle
									dangerouslySetInnerHTML={{
										__html: FixMediaPathsInHtml(pageTitle),
									}}
								/>
							</S.PageTitleContainer>
							<S.TitleContainer>
								<S.Title
									dangerouslySetInnerHTML={{
										__html: FixMediaPathsInHtml(title),
									}}
								/>
							</S.TitleContainer>
							<LinkHelper name={buttonText} url={buttonHref} />
						</S.ContentContainer>
					</C.Column>
					<C.Column size={1} />
					<C.Column size={5}>
						<S.StatisticsWithMediaContainer>
							{isMediaVisible && (
								<S.MediaWrapper>
									<S.MediaContainer>
										<S.StyledImage src={image1} fill alt={alt1} />
									</S.MediaContainer>
								</S.MediaWrapper>
							)}
							<S.StatisticsWrapper>
								<C.Column size={3}>
									<S.StatisticsContainer>
										{leftStats.map((s: IStatistic, index: number) => (
											<S.SingleStatisticContainer key={index}>
												<S.StatisticValue>{s.value}</S.StatisticValue>
												<S.StatisticTitle>{s.title}</S.StatisticTitle>
											</S.SingleStatisticContainer>
										))}
									</S.StatisticsContainer>
								</C.Column>
								<S.StatisticsContainer>
									{rightStats.map((s: IStatistic, index: number) => (
										<S.SingleStatisticContainer key={index}>
											<S.StatisticValue>{s.value}</S.StatisticValue>
											<S.StatisticTitle>{s.title}</S.StatisticTitle>
										</S.SingleStatisticContainer>
									))}
								</S.StatisticsContainer>
								<C.Column size={1} />
							</S.StatisticsWrapper>
						</S.StatisticsWithMediaContainer>
					</C.Column>
				</S.Wrapper>
			</ContentBounds>
		</LayoutV2>
	)
}

export default StatisticsBlock
