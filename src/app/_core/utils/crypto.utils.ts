export class Crypto {
	private static readonly PKCS8_HEADER: string = '-----BEGIN PRIVATE KEY-----';
	private static readonly PKCS8_FOOTER: string = '-----END PRIVATE KEY-----';
	private static readonly SPKI_HEADER: string = '-----BEGIN PUBLIC KEY-----';
	private static readonly SPKI_FOOTER: string = '-----END PUBLIC KEY-----';

	public static async generateKeyPair(): Promise<CryptoKeyPair> {
		return window.crypto.subtle.generateKey(
			{
				name: 'RSA-OAEP',
				modulusLength: 4096,
				publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
				hash: 'SHA-512',
			},
			true,
			['encrypt', 'decrypt']
		);
	}

	public static async encrypt(input: string, key: CryptoKey, encodeAsBase64: boolean = false) {
		const message = new TextEncoder().encode(input);

		const encrypted = await window.crypto.subtle
			.encrypt(
				{
					name: 'RSA-OAEP'
				},
				key,
				message
			)
			.catch(err => {
				console.log(err);
				return null;
			});

		if(!encrypted) {
			throw new Error(`Couldn't encrypt message.`);
		}

		if(!encodeAsBase64) {
			return encrypted;
		} else {
			return btoa(String.fromCharCode.apply(null, new Uint8Array(encrypted)));
		}
	}

	public static async decrypt(input: ArrayBuffer, privateKey: CryptoKey) {
		const encoded = await window.crypto.subtle
			.decrypt(
				{
					name: 'RSA-OAEP'
				},
				privateKey,
				input
			)
			.catch(err => {
				console.log(err);
				return null;
			});

		if(!encoded) {
			throw new Error(`Couldn't decrypt message.`);
		}

		return new TextDecoder().decode(encoded);
	}

	public static async exportKey(key: CryptoKey) {
		return window.crypto.subtle.exportKey('jwk', key);
	}

	public static async passwordEncrypt(input: string, password: string) {
		const salt = this.generateRandomValue(16);
		const iv = this.generateRandomValue(12);
		const passwordKey = await this.getPasswordKey(password)
			.catch(err => {
				console.log(err);
				return null;
			});
		const aesKey = await this.getPasswordAESKey(passwordKey, salt, ['encrypt'])
			.catch(err => {
				console.log(err);
				return null;
			});

		if(!passwordKey || !aesKey) {
			throw new Error(`Couldn't get password key or AES.`);
		}
		
		const encryptedContent = await window.crypto.subtle
			.encrypt(
				{
					name: 'AES-GCM',
					iv: iv,
				},
				aesKey,
				new TextEncoder().encode(input)
			)
			.catch(err => {
				console.log(err);
				return null;
			});

		if(!encryptedContent) {
			throw new Error(`Error encrypting data.`);
		}
	
		const encryptedContentArr = new Uint8Array(encryptedContent);

		let buffer = new Uint8Array(salt.byteLength + iv.byteLength + encryptedContentArr.byteLength);
		buffer.set(salt, 0);
		buffer.set(iv, salt.byteLength);
		buffer.set(encryptedContentArr, salt.byteLength + iv.byteLength);

		return btoa(new Uint8Array(buffer).reduce((data, byte) => data + String.fromCharCode(byte), ''));
	}

	public static async passwordDecrypt(encryptedInput: string, password: string) {
		const encryptedData = Uint8Array.from(atob(encryptedInput), c => c.charCodeAt(0));
		const salt = encryptedData.slice(0, 16);
		const iv = encryptedData.slice(16, 16 + 12);
		const data = encryptedData.slice(16 + 12);
		const passwordKey = await this.getPasswordKey(password)
			.catch(err => {
				console.log(err);
				return null;
			});
		const aesKey = await this.getPasswordAESKey(passwordKey, salt, ['decrypt'])
			.catch(err => {
				console.log(err);
				return null;
			});

		if(!passwordKey || !aesKey) {
			throw new Error(`Couldn't get password key or AES.`);
		}

		const decryptedContent = await window.crypto.subtle
			.decrypt(
				{
					name: 'AES-GCM',
					iv: iv,
				},
				aesKey,
				data
			);

		return new TextDecoder().decode(decryptedContent);
	}

	private static async getPasswordKey(password: string): Promise<CryptoKey> {
		return window.crypto.subtle
			.importKey(
				'raw',
				new TextEncoder().encode(password),
				'PBKDF2',
				false,
				['deriveKey']
			);
	}

	private static async getPasswordAESKey(passwordKey: CryptoKey, salt, usage: KeyUsage[] = ['encrypt', 'decrypt']) {
		return window.crypto.subtle
			.deriveKey(
				{
					name: 'PBKDF2',
					salt: salt,
					iterations: 25_000,
					hash: 'SHA-256',
				},
				passwordKey,
				{ name: 'AES-GCM', length: 256 },
				false,
				usage
			);
	}






	public static async importPrivateKey(pem: string) {
		return window.crypto.subtle.importKey(
			'pkcs8',
			this.pemToArrayBuffer(pem),
			{
				name: 'RSA-OAEP',
				hash: 'SHA-512'
			},
			true,
			['decrypt']
		);
	}

	public static async importPublicKey(pub: string) {
		return window.crypto.subtle.importKey(
			'spki',
			this.pubToArrayBuffer(pub),
			{
				name: 'RSA-OAEP',
				hash: 'SHA-512'
			},
			true,
			['encrypt']
		);
	}

	public static async cryptoKeyToPub(publicKey: CryptoKey) {
		let pub: string = this.SPKI_HEADER + '\n';

		const pKey = await window.crypto.subtle
			.exportKey('spki', publicKey)
			.catch(err => {
				console.log(err);
				return undefined;
			});

		if(!pKey) {
			throw new Error('Error exporting public key.');
		}

		const base64String = btoa(String.fromCharCode(...new Uint8Array(pKey)));
		for(let i = 0; i < Math.ceil(base64String.length / 64); i++) {
			pub += base64String.slice(i * 64, (i + 1) * 64) + '\n';
		}

		pub += this.SPKI_FOOTER;

		return pub.trim();
	}

	public static async cryptoKeyToPem(privateKey: CryptoKey) {
		let pem: string = this.PKCS8_HEADER + '\n';

		const pKey = await window.crypto.subtle
			.exportKey('pkcs8', privateKey)
			.catch(err => {
				console.log(err);
				return undefined;
			});

		if(!pKey) {
			throw new Error('Error exporting private key.');
		}

		const base64String = btoa(String.fromCharCode(...new Uint8Array(pKey)));
		for(let i = 0; i < Math.ceil(base64String.length / 64); i++) {
			pem += base64String.slice(i * 64, (i + 1) * 64) + '\n';
		}

		pem += this.PKCS8_FOOTER;

		return pem.trim();
	}

	public static pemToArrayBuffer(pem: string) {
		pem = pem
			.replace(this.PKCS8_HEADER, '')
			.replace(this.PKCS8_FOOTER, '')
			.replace(/\n/g, '');

		return Uint8Array.from(atob(pem), c => c.charCodeAt(0));
	}

	public static pubToArrayBuffer(pub: string) {
		pub = pub
			.replace(this.SPKI_HEADER, '')
			.replace(this.SPKI_FOOTER, '')
			.replace(/\n/g, '');

		return Uint8Array.from(atob(pub), c => c.charCodeAt(0));
	}

	public static generateRandomValue(length: number = 16) {
		return window.crypto.getRandomValues(new Uint8Array(length));
	}

	public static generateRandomHex(length: number = 16) {
		return this.uint8ArrayToHex(this.generateRandomValue(length));
	};

	public static uint8ArrayToHex(arr: Uint8Array) {
		return [...arr]
			.map(v => v.toString(16).padStart (2, '0'))
			.join('');
	}
}