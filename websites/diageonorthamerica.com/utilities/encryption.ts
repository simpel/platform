import crypto from 'crypto'
import { Buffer } from 'buffer'

const secret_key =
	process.env.NEXT_ENCRYPTION_SECRET ?? 'ctMdRpFchjd3UIgDcjrewW5Pfolk46EI'
const secret_iv =
	process.env.NEXT_ENCRYPTION_IV ?? 'ctMdRpFchjd3UIgDcjCWkW5PfMsM46EI'

const key = crypto
	.createHash('sha512')
	.update(secret_key)
	.digest('hex')
	.slice(0, 32)
const encryptionIV = crypto
	.createHash('sha512')
	.update(secret_iv)
	.digest('hex')
	.slice(0, 16)

// Encrypt data
export function encrypt(data: string) {
	const cipher = crypto.createCipheriv('aes-256-cbc', key, encryptionIV)
	return Buffer.from(
		cipher.update(data, 'utf8', 'hex') + cipher.final('hex'),
	).toString('base64') // Encrypts data and converts to hex and base64
}

// Decrypt data
export function decrypt(encryptedData: string) {
	const buff = Buffer.from(encryptedData, 'base64')
	const decipher = crypto.createDecipheriv('aes-256-cbc', key, encryptionIV)
	return (
		decipher.update(buff.toString('utf8'), 'hex', 'utf8') +
		decipher.final('utf8')
	) // Decrypts data and converts to utf8
}
