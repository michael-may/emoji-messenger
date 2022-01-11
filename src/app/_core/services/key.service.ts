import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Crypto } from '../utils/crypto.utils';

export class StoredEncryptionKey {
	id: string;
	name: string;
	passwordProtected: boolean;
	publicKey: string;
	privateKey: string;
	created: number;
}

export class EncryptionKey extends StoredEncryptionKey {
	unlocked?: boolean = false;
	keyPair?: CryptoKeyPair;
}

@Injectable({
	providedIn: 'root'
})
export class KeyService {
	public keys: EncryptionKey[] = [];

	private keySubject: BehaviorSubject<EncryptionKey[]> = new BehaviorSubject<EncryptionKey[]>(this.keys);
	public get keys$(): Observable<EncryptionKey[]> {
		return this.keySubject.asObservable();
	}

	constructor() {
		this.loadKeys()
			.catch(err => {
				console.log(err);
			});
	}

	public async generateKey(name: string, password?: string) {
		let encryptionKey: Partial<EncryptionKey> = {
			id: `${new Date().getTime()}-${Crypto.generateRandomHex(6)}`,
			name,
			passwordProtected: (password?.length) ? true : false,
			publicKey: null,
			privateKey: null,
			created: new Date().getTime(),
			unlocked: true,
			keyPair: null
		};

		const keyPair: CryptoKeyPair = await Crypto
			.generateKeyPair()
			.catch(err => {
				console.log(err);
				return null;
			});

		if(!keyPair) {
			throw new Error(`Couldn't create key pair.`);
		}

		const pubKeyString = await Crypto
			.cryptoKeyToPub(keyPair.publicKey)
			.catch(err => {
				console.log(err);
				return null;
			});
		let prvKeyString = await Crypto
			.cryptoKeyToPem(keyPair.privateKey)
			.catch(err => {
				console.log(err);
				return null;
			});

		if(!pubKeyString || !prvKeyString) {
			throw new Error(`Couldn't export keys.`);
		}

		if(password?.length) {
			const encryptedPrvKey = await Crypto
				.passwordEncrypt(prvKeyString, password)
				.catch(err => {
					console.log(err);
					return null;
				});

			if(!encryptedPrvKey) {
				throw new Error(`Couldn't password protect private key.`);
			}

			prvKeyString = encryptedPrvKey;
		}

		encryptionKey.publicKey = pubKeyString;
		encryptionKey.privateKey = prvKeyString;
		encryptionKey.keyPair = keyPair;

		this.keys.push(encryptionKey as EncryptionKey);
		this.keySubject.next(this.keys);
		this.storeKeys();

		return encryptionKey.id;
	}

	public getkey(id: string): Observable<EncryptionKey> {
		return this.keySubject
			.asObservable()
			.pipe(
				map((keys: EncryptionKey[]) => keys.find(k => k.id === id))
			);
	}

	public async updateKey() {

	}

	public removeKey(id: string) {
		this.keys = this.keys.filter(k => k.id !== id);
		this.keySubject.next(this.keys);
		this.storeKeys();
	}

	public async unlockKey(id: string, password: string) {
		const key = this.keys.find(k => k.id === id);

		if(!key) {
			throw new Error(`Couldn't find a key with that id.`);
		}

		const decryptedKey = await Crypto
			.passwordDecrypt(key.privateKey, password)
			.catch(err => {
				console.log(err);
				return null;
			});

		if(!decryptedKey) {
			throw new Error(`Couldn't decrypt key. Check password.`);
		}

		const prvKey: CryptoKey = await Crypto
			.importPrivateKey(decryptedKey)
			.catch(err => {
				console.log(err);
				return null;
			});

		if(!prvKey) {
			throw new Error(`Couldn't import private key.`);
		}

		key.keyPair.privateKey = prvKey;
		key.unlocked = true;

		this.keySubject.next(this.keys);

		return key;
	}

	private async loadKeys() {
		let keys: StoredEncryptionKey[];
		try {
			keys = JSON.parse(localStorage.getItem('encryptionKeys')) ?? [];
		} catch(err) {
			keys = [];
		}
		for(let k of keys) {
			let parsed: EncryptionKey = {
				...k,
				keyPair: {
					publicKey: await Crypto
						.importPublicKey(k.publicKey)
						.catch(err => {
							console.log(err);
							return null;
						}),
					privateKey: null
				}
			};

			if(k.passwordProtected) {
				parsed.unlocked = false;
			} else {
				parsed.unlocked = true;
				parsed.keyPair.privateKey = await Crypto
					.importPrivateKey(k.privateKey)
					.catch(err => {
						console.log(err);
						return null;
					});
			}

			this.keys.push(parsed);
		}

		this.keySubject.next(this.keys);
	}

	private storeKeys() {
		let keys: StoredEncryptionKey[] = this.keys
			.map((k: EncryptionKey) => {
				return {
					id: k.id,
					name: k.name,
					passwordProtected: k.passwordProtected,
					publicKey: k.publicKey,
					privateKey: k.privateKey,
					created: k.created,
				}
			});

		localStorage.setItem('encryptionKeys', JSON.stringify(keys));
	}
}
