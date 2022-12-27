/**
 * encryptlong RSA算法数据加解密管理器
 */
import { JSEncrypt } from 'encryptlong'

class EncryptLong {
	constructor(publicKey, privateKey) {
		this.publicKey = publicKey
		this.privateKey = privateKey
		this.encryptor = new JSEncrypt()
	}

	// 公钥加密数据
	encrypt(text) {
		this.encryptor.setPublicKey(this.publicKey)
		let result = this.encryptor.encryptLong(text.toString())
		return result
	}

	// 私钥解密数据
	decrypt(text) {
		this.encryptor.setPrivateKey(this.privateKey)
		let result = this.encryptor.decryptLong(text)
		return result
	}
}

// 加解密实例
export const encryptlong = new EncryptLong(
	process.env.VUE_APP_PWD_RSA_PUBLIC_KEY,
	process.env.VUE_APP_PWD_RSA_PRIVATE_KEY,
)