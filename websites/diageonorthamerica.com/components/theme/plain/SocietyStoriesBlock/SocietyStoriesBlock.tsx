import React from 'react'
import styles from './SocietyStoriesBlock.module.scss'
import SocietyStoriesCard, {
	SocietyStoriesCardProperties,
} from './SocietyStoriesCard/SocietyStoriesCard'

interface SocietyStoriesProps {
	heading: string
	largeItem: SocietyStoriesCardProperties
	items: SocietyStoriesCardProperties[]
}

function SocietyStoriesBlock({
	heading,
	largeItem,
	items,
}: SocietyStoriesProps) {
	return (
		<div className={styles.container}>
			<div className={styles.cardGrid}>
				<div className={styles.bigCardAndTitle}>
					{heading && <h3 dangerouslySetInnerHTML={{ __html: heading }} />}
					<SocietyStoriesCard {...largeItem} />
				</div>
				<div className={styles.smallCards}>
					{items.map((card, index) => (
						<SocietyStoriesCard key={index} {...card} />
					))}
				</div>
			</div>
		</div>
	)
}

export default SocietyStoriesBlock
