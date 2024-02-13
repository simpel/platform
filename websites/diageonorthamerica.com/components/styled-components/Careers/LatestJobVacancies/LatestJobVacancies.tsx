import ContentBounds from 'components/styled-components/Common/ContentBounds'
import LayoutV2 from 'components/styled-components/Common/LayoutV2'
import LinkHelper from 'components/theme/plain/custom/LinkHelper'
import { FixMediaPathsInHtml } from 'utilities/functions'
import * as S from './LatestJobVacancies.styles'
import * as C from '../../Common/Layout/Layout.styles'
import { getGradient } from 'components/styled-components/utils'
import { useState } from 'react'

export interface IJob {
	title: string
	location: string
	href: string
	id: string
}

export interface ILatestJobVacanciesProps {
	topTitle: string
	title: string
	buttonText: string
	buttonHref: string
	gradient: any
	jobs: IJob[]
	viewAllUrl: string
}

const LatestJobVacancies = (props: ILatestJobVacanciesProps) => {
	const {
		gradient,
		topTitle,
		title,
		buttonHref,
		buttonText,
		jobs = [],
		viewAllUrl,
	} = props
	const [isButtonHovered, setIsButtonHovered] = useState(false)
	const [hoveredIndex, setHoveredIndex] = useState<string>('')
	const visibleJobs = jobs.slice(0, 6) || []
	const jobsLeft: IJob[] = []
	const jobsRight: IJob[] = []

	visibleJobs.map((job, index) => {
		if (index % 2 === 0) {
			jobsLeft.push(job)
		} else {
			jobsRight.push(job)
		}
	})

	const usedGradient = getGradient(gradient)
	return (
		<LayoutV2
			background={{
				gradient,
			}}
		>
			<ContentBounds>
				<S.Wrapper>
					<C.Column size={1} />
					<C.Column size={10}>
						<S.Header>
							<C.Column size={7}>
								<S.HeaderContent>
									{topTitle && (
										<S.PageTitleContainer>
											<S.PageTitle
												dangerouslySetInnerHTML={{
													__html: FixMediaPathsInHtml(topTitle),
												}}
											/>
										</S.PageTitleContainer>
									)}
									<S.TitleContainer>
										<S.Title
											dangerouslySetInnerHTML={{
												__html: FixMediaPathsInHtml(title),
											}}
										/>
									</S.TitleContainer>
									<LinkHelper name={'View all vacancies'} url={viewAllUrl} />
								</S.HeaderContent>
							</C.Column>
							<C.Column size={3} />
						</S.Header>
						<S.BodyContent>
							<C.Column size={1}>
								{jobsLeft.map((job, index) => (
									<S.SingleJobVacancyContainer
										key={index}
										href={job.href}
										onMouseOver={() => setHoveredIndex(job.id)}
										onMouseLeave={() => setHoveredIndex('')}
									>
										<S.SingleJobVacancy key={index}>
											<S.JobDetails>
												<S.JobTitle>{job.title}</S.JobTitle>
												<S.JobLocationContainer>
													<S.StyledIcon
														src={'/images/location-icon.svg'}
														width={12}
														height={15}
														alt="location icon"
													/>
													<S.JobLocation>{job.location}</S.JobLocation>
												</S.JobLocationContainer>
											</S.JobDetails>
										</S.SingleJobVacancy>
										<S.ArrowWrapper gradient={usedGradient}>
											<S.OpacityWrapper isVisible={hoveredIndex === job.id} />
											<S.ArrowIconContainer>
												<S.ArrowIcon
													src={'/images/arrow-icon-small.svg'}
													width={10}
													height={10}
													alt="arrow icon"
												/>
											</S.ArrowIconContainer>
										</S.ArrowWrapper>
									</S.SingleJobVacancyContainer>
								))}
							</C.Column>
							<C.Column size={1}>
								{jobsRight.map((job, index) => (
									<S.SingleJobVacancyContainer
										href={job.href}
										onMouseOver={() => setHoveredIndex(job.id)}
										onMouseLeave={() => setHoveredIndex('')}
										key={index}
									>
										<S.SingleJobVacancy key={index}>
											<S.JobDetails>
												<S.JobTitle>{job.title}</S.JobTitle>
												<S.JobLocationContainer>
													<S.StyledIcon
														src={'/images/location-icon.svg'}
														width={12}
														height={15}
														alt="location icon"
													/>
													<S.JobLocation>{job.location}</S.JobLocation>
												</S.JobLocationContainer>
											</S.JobDetails>
										</S.SingleJobVacancy>
										<S.ArrowWrapper gradient={usedGradient}>
											<S.OpacityWrapper isVisible={hoveredIndex === job.id} />
											<S.ArrowIconContainer>
												<S.ArrowIcon
													src={'/images/arrow-icon-small.svg'}
													width={10}
													height={10}
													alt="arrow icon"
												/>
											</S.ArrowIconContainer>
										</S.ArrowWrapper>
									</S.SingleJobVacancyContainer>
								))}
							</C.Column>
						</S.BodyContent>
						<S.ButtonWrapper>
							<S.ButtonContainer
								onMouseOver={() => setIsButtonHovered(true)}
								onMouseLeave={() => setIsButtonHovered(false)}
								gradient={usedGradient}
							>
								<S.Opacity isVisible={isButtonHovered} />
								<S.StyledButton
									target="_blank"
									rel="noopener noreferrer"
									href="https://diageo.wd3.myworkdayjobs.com/en-US/Diageo_Careers/jobAlerts"
								>
									Create job alerts
								</S.StyledButton>
							</S.ButtonContainer>
						</S.ButtonWrapper>
					</C.Column>
					{/* </S.Content> */}
					<C.Column size={1} />
				</S.Wrapper>
			</ContentBounds>
		</LayoutV2>
	)
}

export default LatestJobVacancies
