import gql from 'graphql-tag'

export const miniPageFragment = gql`
	fragment MINIPAGE_FIELDS on Content {
		_id
		title
		url
		metaDescription
		categories
		pageListingImage {
			url
			_id
		}
		articleDate
		contentType
	}
`
export const pageFieldsFragment = gql`
	fragment PAGE_FIELDS on Content {
		_id
		pageId
		contentType
		level
		sortOrder
		title
		url
		urlSegment
		updateDate
		articleDate
		metaDescription
		alternateUrl
		sectionId
		ancestors
		parent {
			_id
			pageId
		}
		pageTheme {
			_id
			theme
		}
		pageListingImage {
			_id
			url
		}
		pageListingImage2 {
			_id
			url
		}
		categoryPages {
			_id
			title
			urlSegment
			parent {
				_id
			}
		}
	}
`

export const contentFieldsFragment = gql`
	fragment CONTENT_FIELDS on Content {
		fields {
			alias
			editor
			text
			textList
			html
			number
			decimal
			boolean
			date
			content {
				_id
				key
				contentType
			}
			mediaList {
				_id
				contentType
			}
			list {
				key
				contentType
				_id
			}
			map {
				mapConfig {
					lat
					lng
					zoom
				}
			}
			link {
				name
				url
				contentId
				mediaId
				target
			}
			blocks {
				_id
				key
				contentType
				fields {
					alias
					editor
					text
					textList
					html
					number
					decimal
					boolean
					date
					content {
						_id
						key
						contentType
					}
					mediaList {
						_id
						contentType
					}
					map {
						mapConfig {
							lat
							lng
							zoom
						}
					}
					list {
						key
						contentType
						_id
					}
					link {
						name
						url
						contentId
						mediaId
						target
					}
					blocks {
						_id
						key
						contentType
						fields {
							alias
							editor
							text
							textList
							html
							number
							decimal
							boolean
							date
							content {
								_id
								key
								contentType
							}
							mediaList {
								_id
								contentType
							}
							map {
								mapConfig {
									lat
									lng
									zoom
								}
							}
							list {
								key
								contentType
								_id
							}
							link {
								name
								url
								contentId
								mediaId
								target
							}
							blocks {
								_id
								key
								contentType
								fields {
									alias
									editor
									text
									textList
									html
									number
									decimal
									boolean
									date
									content {
										_id
										key
										contentType
									}
									mediaList {
										_id
										contentType
									}
									list {
										key
										contentType
										_id
									}
									map {
										mapConfig {
											lat
											lng
											zoom
										}
									}
									link {
										name
										url
										contentId
										mediaId
										target
									}
									blocks {
										_id
										key
										contentType
										fields {
											alias
											editor
											text
											textList
											html
											number
											decimal
											boolean
											date
											content {
												_id
												key
												contentType
											}
											mediaList {
												_id
												contentType
											}
											list {
												key
												contentType
												_id
											}
											map {
												mapConfig {
													lat
													lng
													zoom
												}
											}
											link {
												name
												url
												contentId
												mediaId
												target
											}
											blocks {
												_id
												key
												contentType
												fields {
													alias
													editor
													text
													textList
													html
													number
													decimal
													boolean
													date
													content {
														_id
														key
														contentType
													}
													mediaList {
														_id
														contentType
													}
													list {
														key
														contentType
														_id
													}
													map {
														mapConfig {
															lat
															lng
															zoom
														}
													}
													link {
														name
														url
														contentId
														mediaId
														target
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
`

export const mediaFieldsFragment = gql`
	fragment MEDIA_FIELDS on Medium {
		_id
		title
		url
		fields {
			alias
			text
			number
		}
	}
`
