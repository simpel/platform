import styles from './HeaderPromoBox.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import Icon from 'components/theme/plain/Icon'

interface IHeaderPromoBox {
	image?: string
	title: string
	text: string
	link: string
	href: string
}

const HeaderPromoBox = ({
	image,
	title,
	text,
	link,
	href,
}: IHeaderPromoBox) => {
	let icon = 'icon_arrow_right'

	return (
		<div className={styles.wrapper}>
			<div className={styles.imageWrapper}>
				<Image
					src={`${process.env.NEXT_PUBLIC_MEDIACROP}${process.env.NEXT_PUBLIC_MEDIAPREFIX}${image}`}
					width={276}
					height={150}
					alt={''}
					style={{ objectFit: 'cover' }}
				/>
			</div>
			<div className={styles.titleContainer}>
				<h2
					className={styles.title}
					dangerouslySetInnerHTML={{ __html: title }}
				></h2>
			</div>
			<div className={styles.textContainer}>
				<span
					className={styles.text}
					dangerouslySetInnerHTML={{ __html: text }}
				></span>
			</div>
			<div>
				<Link href={href}>
					{/* <a href={href}> */}
					<span className="link__inner">
						<span className="link__text">{link}</span>
						<Icon name={icon} size="middle" className="link__icon" />
					</span>
					{/* </a> */}
				</Link>
			</div>
		</div>
	)
}

export default HeaderPromoBox
