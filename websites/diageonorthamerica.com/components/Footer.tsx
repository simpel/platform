import process from 'process'
import React from 'react'
import { useLocale } from 'context/locale'
import FooterLinksRend from 'components/blocks/FooterLinksRend'
import FooterLPanelRend from 'components/blocks/FooterLPanelRend'
import FooterRPanelRend from 'components/blocks/FooterRPanelRend'
import FooterLogos from 'components/blocks/FooterLogos'
import { useMediaQuery } from 'hooks/useMediaQuery/useMediaQuery'
import media from '../constants/media'
import FooterSocialRend from './blocks/FooterSocialRend'
import LogoIcon from './theme/plain/custom/LogoIcon'

export default function Footer() {
	const [{ blocks }] = useLocale()

	const isTablet = useMediaQuery(`(min-width: ${media.tablet}px)`)

	const footerSocial = blocks('socialMediaLinks')
	let drinkIqlogoPath = '/images/drinkiq_logo.svg'

	if (process.env.NEXT_PUBLIC_PROJECT === 'PR1495') {
		drinkIqlogoPath = '/images/drinkiq_logo_india.svg'
	}

	return (
		<footer className="footer">
			<div className="brand-logos">
				<div className="flex-container-wrapper">
					<div className="flex-row no-gutters">
						<div className="flex-col-sm-12">
							<div className="footer__brand-logos__wrapper">
								<FooterLogos logoList={blocks('footerLogos')} />
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="container main__footer">
				<div className="footer__top">
					<div className="footer__top-left-side">
						<div className="footer__logo">
							<LogoIcon />
						</div>
						<FooterLPanelRend panelContent={blocks('preFooterContent')} />

						{isTablet && (
							<section className="font-bold footer__nav-heading">
								{footerSocial && footerSocial.length > 0 && (
									<>
										<p className="font-bold footer__nav-heading h5">
											<span>Follow us</span>
										</p>
										<FooterSocialRend linksContent={footerSocial} />
									</>
								)}
							</section>
						)}
					</div>
					<div className="footer__top-main">
						<FooterLinksRend footerLinks={blocks('footerNav')} />
					</div>
					<div className="footer__top-right-side">
						<div className="footer__logo">
							<img src={drinkIqlogoPath} alt="drinkiq" loading="lazy" />
						</div>
						<FooterRPanelRend panelContent={blocks('postFooterContent')} />
					</div>
				</div>
				<div>
					{!isTablet && (
						<section className="font-bold footer__nav-heading">
							{footerSocial && footerSocial.length > 0 && (
								<>
									<p className="font-bold footer__nav-heading h5">
										<span>Follow us</span>
									</p>
									<FooterSocialRend linksContent={footerSocial} />
								</>
							)}
						</section>
					)}
				</div>

				<div className="site-assistance">
					<div id="footer" />
				</div>
			</div>
		</footer>
	)
}
