import { FilterGroup } from 'components/theme/Diageo/DContentWithFilters'
import { useNavigation } from 'context/navigation'
import { fetchSearchResultsVacancies } from 'lib/cms/api/graphql/queries'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { JV2 } from 'types'
import LayoutV2 from '../Common/LayoutV2'
import { getGradient } from '../utils'
import * as S from './HomepageSearchBar.styles'

interface ISearchResult {
	jobTitle: string
	jobLocation: string
	key: string
}

interface IHomepageSearchBarProps {
	gradient: string
}

const HomepageSearchBar = ({ gradient }: IHomepageSearchBarProps) => {
	const [searchQuery, setSearchQuery] = useState('')
	const isTablet = useMediaQuery({ query: '(min-width: 768px)' })
	const [isModalVisible, setIsModalVisible] = useState(false)
	const usedGradient = getGradient(gradient)
	const [data, setData] = useState([] as ISearchResult[])
	const router = useRouter()

	const handleSearchTermChange = async (query?: string) => {
		if (query) {
			const results = (await fetchSearchResultsVacancies(query)) || []
			const newData = results.map((r) => ({
				jobTitle: r.jobPostingTitle,
				jobLocation: r.primaryJobPostingLocation,
				key: r.key,
			}))

			setData(newData)
			return results
		}
	}

	const goToJob = (jobId: string) => {
		router.push(`/en/careers/search-and-apply?jobid=${jobId}`)
	}

	const handleSearchKeyPress = (e: any) => {
		if (e.key === 'Enter') {
			handleSearchTermChange(searchQuery)
			router.push(`/en/careers/search-and-apply?search=${searchQuery}`)
		}
	}

	const handleClickSearchArrow = () => {
		if (searchQuery) {
			router.push(`/en/careers/search-and-apply?search=${searchQuery}`)
		} else {
			router.push('/en/careers/search-and-apply')
		}
	}

	useEffect(() => {
		handleSearchTermChange(searchQuery)
	}, [searchQuery])

	return (
		<S.HigherWrapper>
			<S.Wrapper
				isSearchingResult={isModalVisible}
				onClick={() => setIsModalVisible(!isModalVisible)}
			>
				<S.SearchWrapper>
					<S.SearchIconContainer>
						<S.SearchIcon
							src={'/images/magnifier.svg'}
							width={32}
							height={32}
							alt="Search"
						/>
					</S.SearchIconContainer>
					<S.StyledInput
						type="search"
						placeholder="Search Jobs"
						onChange={(e: any) => setSearchQuery(e.target.value)}
						onKeyPress={(e: any) => handleSearchKeyPress(e)}
					/>
					{isTablet && (
						<S.LinkContainer isVisible={isModalVisible}>
							<S.StyledLink href={`/en/careers/search-and-apply`}>
								See all jobs
							</S.StyledLink>
						</S.LinkContainer>
					)}
					<S.ArrowIconContainer
						isSearchingResult={isModalVisible}
						gradient={usedGradient}
						onClick={() => handleClickSearchArrow()}
					>
						<S.OpacityCircle isVisible={isModalVisible} />
						<S.ArrowIcon
							isVisible={isModalVisible}
							src={'/images/arrow.svg'}
							width={32}
							height={32}
							alt="Search"
						/>
					</S.ArrowIconContainer>
				</S.SearchWrapper>
			</S.Wrapper>
			{data && data.length > 0 && (
				<S.ModalWrapper isModalVisible={isModalVisible}>
					<S.Content>
						<S.ModalTitleContainer>
							<S.ModalTitle>Jobs</S.ModalTitle>
						</S.ModalTitleContainer>
						<S.ModalResultsWrapper>
							{data.map((r: ISearchResult, index: number) => (
								<S.ModalResultWrapper
									key={index}
									onClick={() => goToJob(r.key)}
								>
									<S.JobTitleContainer>
										<S.JobTitle>{r.jobTitle}</S.JobTitle>
									</S.JobTitleContainer>
									{isTablet && (
										<S.JobLocationContainer gradient={usedGradient}>
											<S.JobLocation>{r.jobLocation}</S.JobLocation>
										</S.JobLocationContainer>
									)}
								</S.ModalResultWrapper>
							))}
						</S.ModalResultsWrapper>
					</S.Content>
				</S.ModalWrapper>
			)}
		</S.HigherWrapper>
	)
}

export default HomepageSearchBar
