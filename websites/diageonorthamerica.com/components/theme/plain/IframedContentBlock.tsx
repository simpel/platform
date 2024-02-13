import React from 'react'

function IframedContentBlock() {
	return (
		<>
			<section className="content-block p--l theme-white">
				<div className="offset-bg--reset"></div>
				<div className="block-banner">
					<div className="container--profile-banner-wide p--s flex-row">
						<div className="flex-col-md-12 flex-row">
							<div className="flex-col-md-3 text-body"></div>
							<div className="flex-col-md-8 text-body">
								<div className="module-space">
									<h3>Shareprice calculator</h3>
									<div className="iframe-container height_700">
										<iframe
											src="https://ir.q4europe.com/Solutions/diageo/2924/calc2.aspx"
											title="Share price history"
										></iframe>
									</div>
								</div>

								<div className="module-space">
									<h3>Share price history</h3>
									<div className="iframe-container height_700">
										<iframe
											title="Share price history"
											src="//ir.q4europe.com/Solutionsstaging/Diageo/2924/lookup.aspx"
										></iframe>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}

export default IframedContentBlock
