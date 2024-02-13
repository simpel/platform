import { PageNavigation } from '@diageo/designsystem'
import { useRouter } from 'next/router'
import { type TPageNavigationBlock } from './TPageNavigationBlock'

const PageNavigationBlock = ({ items, navTitle }: TPageNavigationBlock) => {
	const router = useRouter()

	return (
		<PageNavigation navTitle={navTitle}>
			{items.map((item, index) => (
				<PageNavigation.Link
					key={index}
					{...item}
					active={
						item?.href
							? router.asPath ===
							  new URL(item.href).pathname.replace(/\/+$/, '') // Remove trailing slash
							: false
					}
				>
					{item.label}
				</PageNavigation.Link>
			))}
		</PageNavigation>
	)
}

export default PageNavigationBlock
