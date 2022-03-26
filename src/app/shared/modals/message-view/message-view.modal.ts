import { AfterViewInit, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';

import { ImageUtils } from '../../../_core/utils/image.utils';
import { ConversationService, Message } from '../../../_core/services/conversation.service';
import { EncryptionKey, KeyService } from '../../../_core/services/key.service';

import { Crypto } from '../../../_core/utils/crypto.utils';

@Component({
	selector: 'app-message-view',
	templateUrl: './message-view.modal.html',
	styleUrls: ['./message-view.modal.scss']
})
export class MessageViewModal implements AfterViewInit {
	@Input() conversationId: string;
	@Input() message: Message;
	@Input() key: EncryptionKey;

	public messageText: string;

	constructor(
		private readonly modalController: ModalController,
		private readonly conversationService: ConversationService,
		private readonly toastController: ToastController,
		private readonly keyService: KeyService
	) {}

	async ngAfterViewInit() {
		await this.handleData()
			.catch(err => {
				console.log(err);
			});
	}

	public async handleData() {
		const blob = await ImageUtils.read(this.message.imageData)
			.catch(err => {
				console.log(err);
				return null;
			});

		if(this.key.passwordProtected && !this.key.unlocked) {
			const password = window.prompt(`Enter the password for the key: ${this.key.name}`);
			let result: EncryptionKey = await this.keyService
				.unlockKey(this.key.id, password)
				.catch(err => {
					console.log(err);
					return null;
				});

			if(!result) {
				alert(`Couldn't unlock key with the given password.`);
				return;
			}

			this.key = result;
		}

		let result = await this.decrypt(blob, this.key.keyPair.privateKey)
			.catch(err => {
				console.log(err);
				return null;
			});

		if(result) {
			this.messageText = result;
		}
	}

	private async decrypt(image: number[], privateKey: CryptoKey) {
		let unpadded = [];

		const minPx = 512;
		const nextPow = Math.max(1 << (32 - Math.clz32(Math.ceil(Math.sqrt(minPx)))), 128);
		//const density = Math.floor((minPx / (nextPow * nextPow)) * 100);
		const density = Math.floor((nextPow * nextPow) / minPx);

		for(let i = 0; i < minPx; i++) {
			unpadded.push(image[((i * density) * 4) + 3]);
		}

		// console.log('-------UNPADDED--------');
		// console.log(unpadded);
		// console.log('-------/UNPADDED--------');

		const decoded = await Crypto.decrypt(new Uint8Array(unpadded).buffer, privateKey)
			.catch(err => {
				console.log(err);
				return undefined;
			});

		return decoded;
	}

	public async delete() {
		const confirmed = window.confirm(`Are you absolutely sure? This is unrecoverable without a backup.`);

		if(confirmed) {
			this.conversationService
				.deleteMessage(this.conversationId, this.message.id);
			this.dismiss();
		}
	}

	public dismiss() {
		this.modalController.dismiss();
	}
}