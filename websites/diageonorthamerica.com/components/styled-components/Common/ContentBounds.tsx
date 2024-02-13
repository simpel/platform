import * as S from './Content.styles'

const ContentBounds = ({ children, isHeader = false }: any) => {
	return <S.Wrapper isHeader={isHeader}>{children}</S.Wrapper>
}

export default ContentBounds
