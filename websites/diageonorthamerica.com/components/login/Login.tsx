import { useState, useEffect } from 'react'
import { useLogin } from '../../hooks/useLogin/useLogin'
import Button from '../theme/plain/Button'
import LogoIcon from '../theme/plain/custom/LogoIcon'

export const Login = () => {
	const { error, login } = useLogin()

	const [username, setUsername] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [message, setMessage] = useState<string | undefined>()
	const [isInValid, setIsInValid] = useState<boolean>(true)

	const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		if (username.length < 0 || password.length < 0) {
			setMessage('Please enter username and password')
		} else {
			login({ username, password })
		}
	}

	useEffect(() => {
		if (password.length > 0 && username.length > 0) {
			setIsInValid(false)
		} else {
			setIsInValid(true)
		}
	}, [password, username])

	useEffect(() => {
		if (error) setMessage(error)
	}, [error])

	return (
		<div>
			<section className="auth">
				<header className="auth__header">
					<LogoIcon />
					<strong>Restricted access! Please login</strong>
					<i>
						If you don&apos;t know the credentials, please contact your
						administrator
					</i>
				</header>
				<main className="auth__container">
					<form
						noValidate
						className="auth__form"
						autoComplete="off"
						onSubmit={(event) => {
							onSubmit(event)
						}}
					>
						<div className="flex-col-md-12">
							<div className="auth__form__label">
								<label htmlFor="username">Username</label>
							</div>
							<div className="auth__form__field__wrapper">
								<input
									id="username"
									name="username"
									value={username}
									className="auth__form__error__field flex-col-md-12"
									onChange={(event) => {
										setUsername(event.target.value)
									}}
								/>
							</div>
							{username?.length < 1 && (
								<small className="auth__form__error__msg">Required</small>
							)}
						</div>

						<div className="flex-col-md-12">
							<div className="auth__form__label">
								<label htmlFor="username">Password</label>
							</div>
							<div className="auth__form__field__wrapper">
								<input
									type="password"
									id="password"
									name="password"
									value={password}
									className="auth__form__error__field flex-col-md-12"
									onChange={(event) => {
										setPassword(event.target.value)
									}}
								/>
							</div>
							{password?.length < 1 && (
								<small className="auth__form__error__msg">Required</small>
							)}
						</div>
						{message ? (
							<small className="auth__form__error__msg">{message}</small>
						) : null}
						<div className="flex-col-md-12 auth__form__action__wrapper">
							<Button text="Login" type="submit" disabled={isInValid} />
						</div>
					</form>
				</main>
			</section>
		</div>
	)
}
