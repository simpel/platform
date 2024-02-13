/* eslint-disable new-cap */
/* eslint-disable react/no-danger */
import React, { type ComponentProps, useState, type MouseEvent } from 'react'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import { Dropdown } from 'design-system/dropdown'
import { FixMediaPathsInHtml } from 'utilities/functions'
import { type ContactFormBlockProps } from 'components/propTypes'
import l from 'utilities/l'
import { type TContactRequestValues } from 'pages/api/contact/TContact'
import useCsrf from 'lib/session/useCsrf/useCsrf'
import Button from '../Button'
import ContactField from '../ContactField/ContactField'
import Spinner from '../Spinner'
import { type TFieldValidator } from './TContactFormBlock'

export default function ContactFormBlock({
	introText,
	completedText,
	targets,
}: ContactFormBlockProps) {
	const { isLoading, data } = useCsrf()
	const sectionClass = 'flex-col-md-8 '
	const [areaOfInterest, setAreaOfInterest] = useState<string | undefined>()
	const [isSendingForm, setIsSendingForm] = useState(false)
	const [isSuccess, setIsSuccess] = useState<boolean | undefined>()
	const [isError, setIsError] = useState<boolean | undefined>()
	const [message, setMessage] = useState<string | undefined>()
	const { executeRecaptcha } = useGoogleReCaptcha()
	const [fields, setFields] = useState<TFieldValidator>({
		areaOfInterest: {
			isValid: false,

			value: '',
		},
		contactName: {
			isValid: false,

			value: '',
		},
		fromEmail: {
			isValid: false,

			value: '',
		},
		subject: {
			isValid: false,

			value: '',
		},
		message: {
			isValid: false,

			value: '',
		},
	})
	const isFormValid = Object.values(fields).every((field) => field.isValid)

	const dropDownOptions: ComponentProps<typeof Dropdown>['options'] = (
		targets || []
	).map((itm) => ({
		label: itm.option,
		id: itm.emailTargets,
		selected: areaOfInterest === itm.emailTargets,
	}))

	const verifyReCaptcha = async () => {
		l('executeRecaptcha', executeRecaptcha)

		if (!executeRecaptcha) {
			return false
		}

		const token = await executeRecaptcha('submit_contactus')
			.then((response) => {
				l('recaptcha response', response)
				return response
			})
			.catch((error) => {
				l('recaptcha error', error)
				setMessage('Error verifying reCaptcha')
				setIsError(true)
				setIsSendingForm(false)
				return error as Error
			})

		const verifiedResponse = await fetch('/api/recaptcha-siteverify', {
			method: 'POST',
			body: JSON.stringify({ token }),
		})
			.then((response) => {
				return response
			})
			.catch((error) => {
				l('verifiedResponse error', error)
				setMessage('Error verifying reCaptcha')
				setIsError(true)
				setIsSendingForm(false)
				return error as Error
			})

		return verifiedResponse
	}

	const generateFetchParameters = (): RequestInit => {
		const body: TContactRequestValues = {
			toEmail: fields.areaOfInterest.value!,
			fromEmail: fields.fromEmail.value!,
			message: fields.message.value!,
			contactName: fields.contactName.value!,
			subject: fields.subject.value!,
			csrfToken: data!.csrfToken,
		}

		l('generateFetchParameters', body)

		return {
			method: 'POST',
			body: JSON.stringify(body),
		}
	}

	const onSubmit = async () => {
		setIsSendingForm(true)
		setIsSuccess(false)
		setMessage('Sending...')
		const hasPassedCaptcha: boolean = await verifyReCaptcha()
			.then((result) => {
				l('verifyReCaptcha result', result)
				return true
			})
			.catch((error) => {
				l('verifyReCaptcha error', error)
				return false
			})

		l('hasPassedCaptcha', hasPassedCaptcha)

		if (hasPassedCaptcha && isFormValid) {
			const fetchOptions = generateFetchParameters()

			await fetch('/api/contact', fetchOptions)
				.then((result) => {
					l(
						'/api/contact',
						result.ok,
						result.status,
						result.statusText,
						completedText,
					)

					if (result.ok) {
						setMessage(completedText)
						setIsError(false)
						setIsSuccess(true)
					} else {
						setMessage(
							'There was an error trying to send your message. Please try again later.',
						)
						setIsError(true)
						setIsSuccess(false)
					}

					setIsSendingForm(false)
				})
				.catch(() => {
					setMessage(
						'There was an error trying to send your message. Please try again later.',
					)
					setIsError(true)
					setIsSuccess(false)
				})
		}
	}

	const onFieldChange = (key: string, value: string, isValid: boolean) => {
		setFields({
			...fields,
			[key]: {
				value,
				isValid,
			},
		})
	}

	const renderForm = () => {
		return (
			<div>
				<form className="contactus">
					<Dropdown
						options={dropDownOptions}
						label={{ text: 'Area of interest' }}
						placeholder="PLEASE SELECT"
						id="areaOfInterests"
						onChange={(event) => {
							const target = event.target.value
							setAreaOfInterest(target)
							onFieldChange('areaOfInterest', target, target !== undefined)
						}}
					/>
					<ContactField
						type="text"
						label="Contact Name"
						id="contactName"
						name="contactName"
						validation={/^\s*\S.*$/}
						isNotValidMessage="Please enter a valid name"
						onChange={(key, value, isValid) => {
							onFieldChange(key, value, isValid)
						}}
					/>

					<ContactField
						type="email"
						label="Contact Email"
						id="fromEmail"
						name="fromEmail"
						validation={/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/}
						isNotValidMessage="Please enter a email"
						onChange={(key, value, isValid) => {
							onFieldChange(key, value, isValid)
						}}
					/>

					<ContactField
						type="text"
						label="Subject"
						id="subject"
						name="subject"
						validation={/^[A-Za-zÀ-ÿ\d\s]+[.?!]?$/}
						isNotValidMessage="Please enter a subject"
						onChange={(key, value, isValid) => {
							onFieldChange(key, value, isValid)
						}}
					/>

					<ContactField
						type="textarea"
						label="Message"
						id="message"
						name="message"
						validation={/^[p{A-Za-zÀ-ÿ$€£¥&+,:;=?@#."'-}M\d\s\n]+$/}
						isNotValidMessage="Please enter a message that only contains letters and numbers"
						onChange={(key, value, isValid) => {
							onFieldChange(key, value, isValid)
						}}
					/>

					<div className="flex-col-md-12 contactus__action__wrapper">
						<Button
							disabled={!isFormValid || isSendingForm}
							text="Send"
							type="submit"
							aria-label="Contact Us"
							onClick={async (event: MouseEvent<HTMLButtonElement>) => {
								event.preventDefault()
								l('onSubmit', event)
								await onSubmit()
							}}
						/>
						{!isFormValid && (
							<small className="contactus__error__msg">
								Please fill in all the fields before submitting.
							</small>
						)}
					</div>
				</form>
			</div>
		)
	}

	const renderContent = () => {
		if (isSuccess && message) {
			return (
				<div
					dangerouslySetInnerHTML={{
						__html: FixMediaPathsInHtml(message),
					}}
					className="rich-text-editor p--xxs"
				/>
			)
		}

		if (isError && message) {
			return (
				<div
					dangerouslySetInnerHTML={{
						__html: FixMediaPathsInHtml(message),
					}}
					className="rich-text-editor p--xxs"
				/>
			)
		}

		if (isLoading) {
			return <Spinner />
		}

		if (!isLoading && !data) {
			return (
				<div
					dangerouslySetInnerHTML={{
						__html: FixMediaPathsInHtml(
							'There was an error loading the form. Please try again later.',
						),
					}}
					className="rich-text-editor p--xxs"
				/>
			)
		}

		return renderForm()
	}

	return (
		<section className="flex-container-wrapper mb--m">
			<div>
				<div className={sectionClass}>
					{introText && (
						<div
							dangerouslySetInnerHTML={{
								__html: FixMediaPathsInHtml(introText),
							}}
							className="rich-text-editor p--xxs"
						/>
					)}

					{renderContent()}
				</div>
			</div>
		</section>
	)
}
