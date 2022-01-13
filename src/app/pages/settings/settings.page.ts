import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { IonInput, IonRouterOutlet, ModalController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Contact, ContactService } from '../../_core/services/contact.service';
import { Conversation, ConversationService } from '../../_core/services/conversation.service';
import { KeyService, StoredEncryptionKey } from '../../_core/services/key.service';

import { Crypto } from '../../_core/utils/crypto.utils';

@Component({
	selector: 'app-settings',
	templateUrl: 'settings.page.html',
	styleUrls: ['settings.page.scss'],
})
export class SettingsPage implements OnDestroy {
	public processingBackup: boolean = false;
	public processingFile: boolean = false;
	
	constructor(
		private readonly keyService: KeyService,
		private readonly contactService: ContactService,
		private readonly conversationService: ConversationService,
		private readonly toastController: ToastController
	) {}

	ngOnDestroy() {
		
	}

	public async export() {
		this.processingBackup = true;

		const password = window.prompt('Enter a password for this backup (or leave blank).');

		let encryptionKeys = localStorage.getItem('encryptionKeys') ?? '';
		let contacts = localStorage.getItem('contacts') ?? '';
		let conversations = localStorage.getItem('conversations') ?? '';
		
		const exportData = JSON.stringify({
			encryptionKeys,
			contacts,
			conversations
		});

		const encryptedBackup = await Crypto
			.passwordEncrypt(exportData, password)
			.catch(err => {
				console.log(err);
				return null;
			});

		if(!encryptedBackup) {
			const toast = await this.toastController
				.create({
					message: 'Error encrypting backup.',
					duration: 2000
				});
			toast.present();
			this.processingBackup = false;
			return;
		}

		const blob = new Blob([encryptedBackup], { type: 'application/messengerbackup' });
		const url = URL.createObjectURL(blob);

		this.processingBackup = false;

		var link = document.createElement('a');
		link.href = url;
		//link.target = '_blank';
		link.download = `${Date.now()}.messengerbackup`;
		link.click();
	}

	public async import(event) {
		if(!event.target.files?.length) {
			return;
		}

		this.processingFile = true;

		let file = event?.target?.files?.[0];

		if(!file) {
			const toast = await this.toastController
				.create({
					message: 'Error loading file.',
					duration: 2000
				});
			toast.present();
			this.processingFile = false;
			return;
		}

		const data: string = await this.loadFile(file)
			.catch(err => {
				console.log(err);
				return null;
			});

		if(!data) {
			const toast = await this.toastController
				.create({
					message: 'Error parsing file.',
					duration: 2000
				});
			toast.present();
			this.processingFile = false;
			return;
		}

		const password = window.prompt('Enter the password for this backup (or leave blank if none).');

		const decryptedBackup = await Crypto
			.passwordDecrypt(data, password)
			.catch(err => {
				console.log(err);
				return null;
			});

		if(!decryptedBackup) {
			const toast = await this.toastController
				.create({
					message: 'Error decrypting backup. Maybe wrong password?',
					duration: 2000
				});
			toast.present();
			this.processingFile = false;
			return;
		}

		let parsedBackup;
		try {
			parsedBackup = JSON.parse(decryptedBackup);
		} catch(err) {
			const toast = await this.toastController
				.create({
					message: 'Error parsing backup. Probably corrupted.',
					duration: 2000
				});
			toast.present();
			this.processingFile = false;
			return;
		}

		if(parsedBackup.encryptionKeys) {
			localStorage.setItem('encryptionKeys', parsedBackup.encryptionKeys);
			await this.keyService
				.loadKeys()
				.catch(err => {
					console.log(err);
				});
		}

		if(parsedBackup.contacts) {
			localStorage.setItem('contacts', parsedBackup.contacts);
			await this.contactService
				.loadContacts()
				.catch(err => {
					console.log(err);
				});
		}

		if(parsedBackup.conversations) {
			localStorage.setItem('conversations', parsedBackup.conversations);
			await this.conversationService
				.loadConversations()
				.catch(err => {
					console.log(err);
				});
		}

		this.processingFile = false;

		const toast = await this.toastController
			.create({
				message: 'Import complete!',
				duration: 2000
			});
		toast.present();
	}

	public async deleteData() {
		const confirmed = window.confirm(`Are you absolutely sure? This is unrecoverable without a backup.`);

		if(confirmed) {
			localStorage.clear();

			await this.keyService
				.loadKeys()
				.catch(err => {
					console.log(err);
				});

			await this.contactService
				.loadContacts()
				.catch(err => {
					console.log(err);
				});

			await this.conversationService
				.loadConversations()
				.catch(err => {
					console.log(err);
				});
		}
	}

	private async loadFile(file: File): Promise<string> {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onloadend = () => resolve(reader.result as string);
			reader.onerror = (err) => reject(err);
			reader.readAsText(file);
		});
	}
}
