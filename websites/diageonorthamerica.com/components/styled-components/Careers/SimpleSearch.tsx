import BreadcrumbsHelper from 'components/theme/plain/custom/BreadcrumbHelper'
// import { useMediaQuery } from 'react-responsive'
import ContentBounds from '../Common/ContentBounds'
import LayoutV2 from '../Common/LayoutV2'
import * as S from './HomepageSearchBar.styles'

interface ISimplySearchProps {
	gradient: string
	onChange?: any
	defaultValue?: string
	onClick?: any
	breadcrumbs: any
}

const SimpleSearch = ({
	gradient,
	onChange,
	defaultValue,
	onClick,
	breadcrumbs,
}: ISimplySearchProps) => {
	// const isTablet = useMediaQuery({ query: '(min-width: 768px)' })
	return (
		<LayoutV2
			background={{
				gradient,
			}}
		>
			<ContentBounds>
				<S.BreadcrumbsContainer>
					<S.Breadcrumbs>
						<S.BreadcrumbsList>
							<BreadcrumbsHelper breadcrumbs={breadcrumbs}></BreadcrumbsHelper>
						</S.BreadcrumbsList>
					</S.Breadcrumbs>
				</S.BreadcrumbsContainer>
				<S.TitleContainer>
					<S.Title>Search for roles</S.Title>
				</S.TitleContainer>
				<S.Wrapper>
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
							placeholder="Search jobs"
							onChange={(e: any) => onChange(e.target.value)}
							defaultValue={defaultValue}
						/>
						{/* <S.ArrowIconContainer
              onMouseOver={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              isSearchingResult={isHovered}
              gradient={usedGradient}
              onClick={onClick}
            >
              <S.OpacityCircle isVisible={isHovered} />
              <S.ArrowIcon isVisible={isHovered} src={'/images/arrow.svg'} width={32} height={32} />
            </S.ArrowIconContainer> */}
					</S.SearchWrapper>
				</S.Wrapper>
			</ContentBounds>
		</LayoutV2>
	)
}

export default SimpleSearch
