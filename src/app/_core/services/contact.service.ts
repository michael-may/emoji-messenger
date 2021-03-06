import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Crypto } from '../utils/crypto.utils';

export class StoredContact {
	id: string;
	name: string;
	publicKey: string;
	created: number;
}

export class Contact extends StoredContact {
	publicKeyImported?: CryptoKey;
}

@Injectable({
	providedIn: 'root'
})
export class ContactService {
	public contacts: Contact[] = [];

	private contactSubject: BehaviorSubject<Contact[]> = new BehaviorSubject<Contact[]>(this.contacts);
	public get contacts$(): Observable<Contact[]> {
		return this.contactSubject.asObservable();
	}

	constructor() {
		this.loadContacts()
			.catch(err => {
				console.log(err);
			});
	}

	public async addContact(name: string, publicKeyString: string) {
		let contact: Partial<Contact> = {
			id: `${new Date().getTime()}-${Crypto.generateRandomHex(6)}`,
			name,
			publicKey: publicKeyString,
			created: new Date().getTime()
		};

		const pubKey = await Crypto
			.importPublicKey(publicKeyString)
			.catch(err => {
				console.log(err);
				return null;
			});

		if(!pubKey) {
			throw new Error(`Couldn't decode public key.`);
		}

		contact.publicKeyImported = pubKey;

		this.contacts.push(contact as Contact);
		this.contactSubject.next(this.contacts);
		this.storeContacts();

		return contact.id;
	}

	public getContact(id: string): Observable<Contact> {
		return this.contactSubject
			.asObservable()
			.pipe(
				map((contacts: Contact[]) => contacts.find(c => c.id === id))
			);
	}

	public async updateContact() {

	}

	public removeContact(id: string) {
		this.contacts = this.contacts.filter(k => k.id !== id);
		this.contactSubject.next(this.contacts);
		this.storeContacts();
	}

	public async loadContacts() {
		this.contacts = [];
		let contacts: StoredContact[];
		try {
			contacts = JSON.parse(localStorage.getItem('contacts')) ?? [];
		} catch(err) {
			contacts = [];
		}
		for(let k of contacts) {
			let parsed: Contact = {
				...k,
				publicKeyImported: await Crypto
					.importPublicKey(k.publicKey)
					.catch(err => {
						console.log(err);
						return null;
					})
			};

			this.contacts.push(parsed);
		}

		this.contactSubject.next(this.contacts);
	}

	private storeContacts() {
		let contacts: StoredContact[] = this.contacts
			.map((k: Contact) => {
				return {
					id: k.id,
					name: k.name,
					publicKey: k.publicKey,
					created: k.created,
				}
			});

		localStorage.setItem('contacts', JSON.stringify(contacts));
	}
}
