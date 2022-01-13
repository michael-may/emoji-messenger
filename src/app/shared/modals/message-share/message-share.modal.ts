import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';

import { ImageUtils } from '../../../_core/utils/image.utils';
import { ConversationService, Message } from '../../../_core/services/conversation.service';

import QRCode from 'qrcode';

@Component({
	selector: 'app-message-share',
	templateUrl: './message-share.modal.html',
	styleUrls: ['./message-share.modal.scss']
})
export class MessageShareModal {
	@Input() conversationId: string;
	@Input() message: Message;

	@ViewChild('canvas') canvas: ElementRef<HTMLCanvasElement>;

	constructor(
		private readonly modalController: ModalController,
		private readonly conversationService: ConversationService,
		private readonly toastController: ToastController
	) {}

	public async share(data?: string) {
		if(!data) {
			data = this.message.imageData;
		}

		if(!navigator.share) {
			window.open(data, '_blank');
			return;
		}
		
		navigator.share({
			files: [
				new File(
					[ImageUtils.base64ToBlob(data)],
					`encrypted-message-${Date.now()}.png`,
					{
						type: 'image/png'
					}
				),
			]
		});
	}

	public async shareQR() {
		const qr = await QRCode
			.toDataURL(
				[
					{
						data: this.message.dataRaw
					},
					{
						data: this.message.emoji
					},
					{
						data: this.message.backgroundColor
					}
				],
				{
					errorCorrectionLevel: 'H'
				}
			)
			.catch(err => {
				console.log(err);
				return null;
			});

		if(!qr) {
			const toast = await this.toastController
				.create({
					message: 'Error generating QR code.',
					duration: 2000
				});
			toast.present();
			return;
		}

		await this.share(qr)
			.catch(err => {
				console.log(err);
			});
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