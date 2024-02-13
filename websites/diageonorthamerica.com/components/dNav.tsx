import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { usePages } from 'context/pages'
import { useNavigation } from 'context/navigation'
import { useLocale } from 'context/locale'

import Icon from 'components/theme/plain/Icon'
import LogoIcon from './theme/plain/custom/LogoIcon'

export default function Header() {
	const [, setScrolled] = useState(false)
	const [{ page }] = usePages()
	const [{ text }] = useLocale()
	const [, { setCurrentNavigationItem }] = useNavigation()
	//const [{ navPages }] = useNavigation()
	//const [buyNowLink, ...navigation] = blocks('primaryNavigation')
	const { query } = useRouter()

	useEffect(() => {
		setCurrentNavigationItem(page.url.replace('/home', ''))
	})

	useEffect(() => {
		const handleScroll = () =>
			window.requestAnimationFrame(() => {
				setScrolled(window.scrollY > 0)
			})
		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	})

	//if (!navigation.length) return null

	return (
		<nav>
			<Link href={`/${query.locale}`} className="nav-home">
				<LogoIcon altText={text('headerTitle')} />
				{/* <img src={logoPath} alt={text('headerTitle')} /> */}
			</Link>

			<div className="nav-main">
				{/* {navPages.children[0].children.map((itm) => {
            return <NavItemRend navitem={itm} key={itm.pageId}></NavItemRend>
          })} */}

				<div className="header-bar">
					{/* <button className="toggle-menu" type="button">
            Menu
          </button> */}

					<div className="toggle-menu">
						<div className="one"></div>
						<div className="two"></div>
						<div className="three"></div>
					</div>

					<div className="mobile-logo">
						<LogoIcon altText={text('headerTitle')} />
					</div>

					<div className="mobile-search">
						<Icon name="icon_search" size="middle" className="link__icon" />
					</div>
				</div>
				<div className="menu-wrapper">
					<div className="list-wrapper">
						<ul className="menu level-1">
							<li>
								<a href="" className="nested">
									Our Business{' '}
									<Icon
										name="icon_angle_right"
										size="middle"
										className="link__icon"
									/>
								</a>
								<div className="sub-nav-container">
									<ul className="sub-menu level-2">
										<li>
											<h5>Business overview</h5>
										</li>
										<li>
											<a href="">Diageo at a glance</a>
										</li>
										<li>
											<a href="">Who we are</a>
										</li>
										<li>
											<a href="">Our strategy</a>
										</li>
										<li>
											<a href="">Our business model</a>
										</li>
										<li>
											<a href="">
												Where we operate{' '}
												<Icon
													name="icon_angle_right"
													size="middle"
													className="link__icon"
												/>
											</a>
											<ul className="sub-menu level-3">
												<li>
													<h5>Where we operate</h5>
												</li>
												<li>
													<a href="">Global</a>
												</li>
												<li>
													<a href="">
														Europe{' '}
														<Icon
															name="icon_angle_right"
															size="middle"
															className="link__icon"
														/>
													</a>
													<ul className="sub-menu level-4">
														<li>
															<h5>Europe</h5>
														</li>
														<li>
															<a href="">Ireland</a>
														</li>
														<li>
															<a href="">Great Britain</a>
														</li>
													</ul>
												</li>
												<li>
													<a href="">North America</a>
												</li>
												<li>
													<a href="">Latin America &amp; Caribbean Pacific</a>
												</li>
												<li>
													<a href="">Africa</a>
												</li>
											</ul>
										</li>
										<li>
											<a href="">Our history</a>
										</li>
										<li>
											<a href="">Executive Committee</a>
										</li>
										<li>
											<a href="">Board of Directors</a>
										</li>
										<li>
											<a href="">Corporate governance</a>
										</li>
									</ul>
								</div>
							</li>
							<li>
								<a href="" className="nested">
									Our Brands{' '}
									<Icon
										name="icon_angle_right"
										size="middle"
										className="link__icon"
									/>
								</a>
								<div className="sub-nav-container">
									<ul className="sub-menu level-2">
										<li>
											<h5>Brands overview</h5>
										</li>
										<li>
											<a href="">Our brands overview</a>
										</li>
										<li>
											<a href="">Brand introduction</a>
										</li>
										<li>
											<a href="">Brand explorer</a>
										</li>
										<li>
											<a href="">Scotch Whisky</a>
										</li>
									</ul>
								</div>
							</li>
							<li>
								<a href="" className="nested">
									Society 2030{' '}
									<Icon
										name="icon_angle_right"
										size="middle"
										className="link__icon"
									/>
								</a>
								<div className="sub-nav-container">
									<ul className="sub-menu level-2">
										<li>
											<h5>Society 2030 overview</h5>
										</li>

										<li>
											<a href="">Society 2030: Spirit of Progress</a>
										</li>
										<li>
											<a href="">Promote positive drinking</a>
										</li>
										<li>
											<a href="">Champion inclusion and diversity</a>
										</li>
										<li>
											<a href="">Pioneer grain to glass sustainability</a>
										</li>
										<li>
											<a href="">Doing business the right way</a>
										</li>
										<li>
											<a href="">Case studies</a>
										</li>
									</ul>
								</div>
							</li>
							<li>
								<a href="">News and Media</a>
							</li>
							<li>
								<a href="">Investors</a>
							</li>
							<li>
								<a href="">Careers</a>
							</li>
						</ul>
						<div className="mobile-nav-footer">
							<a href="">
								View all Diageo websites{' '}
								<Icon
									name="icon_angle_right"
									size="middle"
									className="link__icon"
								/>
							</a>
							{/* <ul className="social__list bare-list flex flex-align-center flex-wrap"> 
                <li className="social__list-item">
                  <div
                    className="social-icon"
                    data-channel-name="channelFacebook"
                    data-account-name="accountFacebook"
                    data-link-name="facebook"
                  >
                    <a target="_blank" rel="noreferrer" href="https://www.facebook.com" title="channelFacebook">
                      <svg width="30" height="30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M0 14.962C0 6.699 6.699 0 14.962 0s14.962 6.699 14.962 14.962-6.7 14.962-14.962 14.962C6.699 29.924 0 23.224 0 14.962ZM18.6 7.62l2.07-.001V3.975l-3.016-.004c-2.983 0-5.026 1.821-5.026 5.166v2.881H9.254v3.908h3.374v10.028h4.036V15.926h3.868l.002-3.908h-3.87V9.523c0-1.131.314-1.902 1.936-1.902Z"
                          fill="#000"
                        ></path>
                      </svg>
                    </a>
                  </div>
                </li>
                <li className="social__list-item">
                  <div
                    className="social-icon"
                    data-channel-name="channelTwitter"
                    data-account-name="accountTwitter"
                    data-link-name="twitter"
                  >
                    <a target="_blank" rel="noreferrer" href="https://twitter.com" title="channelTwitter">
                      <svg width="31" height="30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M.923 15c0-8.283 6.717-15 15-15 8.283 0 15 6.717 15 15 0 8.283-6.716 15-15 15-8.283 0-15-6.717-15-15Zm21.859-2.859c0-.149-.003-.297-.01-.445a6.996 6.996 0 0 0 1.717-1.783 6.87 6.87 0 0 1-1.977.542 3.457 3.457 0 0 0 1.514-1.904 6.906 6.906 0 0 1-2.186.836 3.444 3.444 0 0 0-5.867 3.14 9.775 9.775 0 0 1-7.097-3.598 3.44 3.44 0 0 0 1.066 4.596 3.419 3.419 0 0 1-1.56-.43v.044a3.444 3.444 0 0 0 2.763 3.375 3.446 3.446 0 0 1-1.555.059 3.447 3.447 0 0 0 3.216 2.391 6.908 6.908 0 0 1-4.276 1.474c-.278 0-.552-.016-.821-.048a9.745 9.745 0 0 0 5.277 1.547c6.333 0 9.796-5.246 9.796-9.796Z"
                          fill="#000"
                        ></path>
                      </svg>
                    </a>
                  </div>
                </li>
                <li className="social__list-item">
                  <div
                    className="social-icon"
                    data-channel-name="channelLinkedin"
                    data-account-name="accountLinkedin"
                    data-link-name="linkedin"
                  >
                    <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/" title="channelLinkedin">
                      <svg width="31" height="30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M.923 15c0-8.283 6.717-15 15-15 8.283 0 15 6.717 15 15 0 8.283-6.716 15-15 15-8.283 0-15-6.717-15-15Zm6.989 7.676h3.653v-10.99H7.912v10.99Zm1.827-12.492h-.023c-1.226 0-2.02-.844-2.02-1.898 0-1.079.818-1.9 2.068-1.9s2.018.821 2.042 1.9c0 1.054-.793 1.898-2.067 1.898Zm11.347 12.49h3.652v-6.302c0-3.375-1.802-4.946-4.205-4.946-1.939 0-2.807 1.065-3.293 1.814v-1.556h-3.652c.047 1.03 0 10.99 0 10.99h3.653v-6.137c0-.329.023-.657.12-.892.264-.656.865-1.336 1.874-1.336 1.322 0 1.85 1.008 1.85 2.486v5.88Z"
                          fill="#000"
                        ></path>
                      </svg>
                    </a>
                  </div>
                </li>
                <li className="social__list-item">
                  <div
                    className="social-icon"
                    data-channel-name="channelYoutube"
                    data-account-name="accountYoutube"
                    data-link-name="youtube"
                  >
                    <a target="_blank" rel="noreferrer" href="https://www.youtube.com" title="channelYoutube">
                      <svg width="31" height="30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="m14.056 17.81 4.88-2.81-4.88-2.81v5.62Z" fill="#000"></path>
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M.923 15c0-8.283 6.717-15 15-15 8.283 0 15 6.717 15 15 0 8.283-6.716 15-15 15-8.283 0-15-6.717-15-15Zm23.99 4.524c.385-1.467.385-4.509.385-4.509s.016-3.057-.386-4.524A2.349 2.349 0 0 0 23.26 8.84c-1.467-.402-7.335-.402-7.335-.402s-5.867 0-7.334.387a2.396 2.396 0 0 0-1.653 1.667C6.552 11.958 6.552 15 6.552 15s0 3.057.386 4.509c.217.803.85 1.436 1.653 1.652 1.482.401 7.334.401 7.334.401s5.868 0 7.335-.386a2.349 2.349 0 0 0 1.652-1.652Z"
                          fill="#000"
                        ></path>
                      </svg>
                    </a>
                  </div>
                </li>
                <li className="social__list-item">
                  <div
                    className="social-icon"
                    data-channel-name="channelInstagram"
                    data-account-name="accountInstagram"
                    data-link-name="instagram"
                  >
                    <a target="_blank" rel="noreferrer" href="https://www.instagram.com" title="channelInstagram">
                      <svg width="31" height="30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M18.795 15a2.871 2.871 0 1 1-5.743 0 2.871 2.871 0 0 1 5.743 0ZM20.52 11.434a1.034 1.034 0 1 1 0-2.067 1.034 1.034 0 0 1 0 2.067Z"
                          fill="#000"
                        ></path>
                        <path
                          d="M15.925 19.424a4.423 4.423 0 1 1 0-8.846 4.423 4.423 0 0 1 0 8.846Z"
                          fill="#000"
                        ></path>
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M.923 15c0-8.283 6.717-15 15-15 8.283 0 15 6.717 15 15 0 8.283-6.716 15-15 15-8.283 0-15-6.717-15-15Zm23.161 5.642c.213-.548.36-1.174.4-2.09.043-.92.053-1.213.053-3.552 0-2.34-.01-2.633-.052-3.551-.042-.917-.187-1.543-.4-2.09a4.22 4.22 0 0 0-.994-1.526 4.222 4.222 0 0 0-1.526-.994c-.548-.213-1.174-.358-2.09-.4-.919-.042-1.212-.052-3.552-.052-2.339 0-2.632.01-3.55.052-.917.042-1.543.187-2.091.4a4.219 4.219 0 0 0-1.526.994 4.22 4.22 0 0 0-.994 1.525c-.213.548-.358 1.174-.4 2.09-.042.92-.052 1.213-.052 3.552 0 2.34.01 2.633.052 3.551.042.917.188 1.543.4 2.09a4.22 4.22 0 0 0 .994 1.526c.43.439.95.778 1.526.994.547.213 1.174.358 2.09.4.92.042 1.212.052 3.552.052 2.339 0 2.632-.01 3.55-.052.918-.042 1.544-.187 2.091-.4a4.404 4.404 0 0 0 2.52-2.52Z"
                          fill="#000"
                        ></path>
                      </svg>
                    </a>
                  </div>
                </li>
              </ul> */}

							{/* <SocialList heading="Follow us" headingLevel={HeadingLevel.H5} icons={socialList} /> */}
						</div>
					</div>
					<div className="list-wrapper">
						<span className="back-one-level">
							<Icon
								name="icon_arrow_left"
								size="middle"
								className="link__icon"
							/>
							back to menu
						</span>
						<div className="sub-menu-wrapper"></div>
					</div>
					<div className="list-wrapper">
						<span className="back-one-level">
							<Icon
								name="icon_arrow_left"
								size="middle"
								className="link__icon"
							/>
							back to menu
						</span>
						<div className="sub-menu-wrapper"></div>
					</div>
					<div className="list-wrapper">
						<span className="back-one-level">
							<Icon
								name="icon_arrow_left"
								size="middle"
								className="link__icon"
							/>
							back to menu
						</span>
						<div className="sub-menu-wrapper"></div>
					</div>
				</div>
			</div>

			{/* <ul className="main-nav">{renderBlocks(navigation, undefined, undefined, localePage)}</ul> */}

			<div className="nav-search">
				<Icon name="icon_search" size="middle" className="link__icon" />
				<span>Search</span>
			</div>
		</nav>
	)
}
