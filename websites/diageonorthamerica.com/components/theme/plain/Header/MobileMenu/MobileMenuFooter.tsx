import React, { ReactChild } from 'react'
import { useLocale } from 'context/locale'
import styles from './MobileMenu.module.scss'
import Icon from '../../Icon'
import classNames from 'classnames'
import FooterSocialRend from '../../../../../components/blocks/FooterSocialRend'

export interface FooterLinkProps {
	label: string
	target: string
	url: string
}

export interface FooterLinkSectionProps {
	heading: string
	links: FooterLinkProps[]
}

export const renderFooterLinks = (
	fromItems: FooterLinkSectionProps[],
	onBackClick: () => void,
): ReactChild => {
	const backLinkClasses = classNames({
		[styles.menuItem]: true,
		[styles.backToPrevious]: true,
	})

	const headingClasses = classNames({
		[styles.menuItem]: true,
		[styles.heading]: true,
	})

	const linkClasses = classNames({
		[styles.menuItem]: true,
		[styles.external]: true,
	})

	return (
		<ul className={styles.menu}>
			<li className={backLinkClasses} onClick={onBackClick}>
				<Icon
					name="icon_arrow_left"
					size="middle"
					className={styles.menuItemBackArrow}
				/>
				<span>Back to menu</span>
			</li>
			{fromItems.map(({ heading, links }, index) => {
				return (
					<React.Fragment key={`${heading}_${index}`}>
						<li className={headingClasses}>
							<span>{heading}</span>
						</li>
						{links.map(({ url, target, label }, index) => (
							<li key={index} className={linkClasses}>
								<a href={url} target={target}>
									{label}
								</a>
								<Icon
									name="icon_external_link"
									size="ex-small"
									className={styles.menuItemExternalLink}
								/>
							</li>
						))}
					</React.Fragment>
				)
			})}
		</ul>
	)
}

function MobileMenuFooter({
	onFooterLinkClick,
}: {
	onFooterLinkClick: () => void
}) {
	const [{ blocks }] = useLocale()
	const footerSocial = blocks('socialMediaLinks')

	return (
		<>
			<li className={styles.mobileMenuFooter}>
				<div className={styles.menuItem} onClick={onFooterLinkClick}>
					<span>View all Diageo websites</span>
					<Icon
						name="icon_angle_right"
						size="middle"
						className={styles.menuItemForwardArrow}
					/>
				</div>

				<div className={`${styles.social}`}>
					{footerSocial && footerSocial.length > 0 && (
						<FooterSocialRend linksContent={footerSocial}></FooterSocialRend>
					)}
				</div>
			</li>
		</>
	)
}

export default MobileMenuFooter
