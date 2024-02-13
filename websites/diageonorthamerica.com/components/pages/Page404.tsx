import React from 'react'

import Layout from 'components/Layout'
import { useRouter } from 'next/router'
import Link from 'next/link'
import SearchInput from 'components/theme/plain/SearchInput'
//@ts-ignore
import styles from 'components/theme/plain/Header/Header.module.scss'

export default function Page404() {
	// const [f] = useFields()
	//   const renderSettings: RenderSettings = { location: 'header' }
	//   const header = renderBlocks(f.blocks('headerContent'), renderSettings)
	//   const body = renderBlocks(f.blocks('body'))
	const router = useRouter()
	const locale = '/en'
	const handleSearchInput = (value: string) => {
		if (value.length) {
			router.push(`${locale}/search?q=${value}&search=Search`)
		}
	}
	return (
		<>
			<Layout>
				<section className="content-block p--l theme-amber">
					<div className="offset-bg--reset"></div>
					<div className="block-banner">
						<div className="container--profile-banner-wide p--s flex-row">
							<div className="flex-col-md-12 flex-row">
								<div className="flex-col-md-3"></div>
								<div className="flex-col-md-6">
									<div className="h1">
										<p>404 Page Not Found</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
				<section className="content-block heading-bg theme-white">
					<div className="pageblock p--l">
						<div className="content-blurb--wide">
							<div className="text-body">
								<div>
									<p>Sorry, the page you're looking for cannot be found.</p>
									<p>
										Please use one of the following options to get back on track
									</p>
								</div>
								<ul className="pagenotfound__container__list">
									<li>
										<a
											className="pagenotfound__container__list__anchor"
											onClick={() => router.back()}
										>
											Go back
										</a>
									</li>
									<li>
										<Link
											href={`${locale}/sitemap`}
											className="pagenotfound__container__list__anchor"
										>
											Use our sitemap to find the right page
										</Link>
									</li>
									<li>
										<Link
											href="/"
											className="pagenotfound__container__list__anchor"
										>
											Go to our homepage
										</Link>
									</li>
								</ul>
								<div className="pagenotfound__container__search">
									<SearchInput
										name="search"
										size="middle"
										placeholder="Please enter keyword(s)"
										buttonType="submit"
										label="Search our site"
										buttonOnClick={handleSearchInput}
									/>
								</div>
							</div>
						</div>
					</div>
				</section>
			</Layout>
		</>
	)
}
