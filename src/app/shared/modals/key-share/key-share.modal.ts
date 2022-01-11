import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';

import { ImageUtils } from '../../../_core/utils/image.utils';
import { ConversationService, Message } from '../../../_core/services/conversation.service';

import QRCode from 'qrcode';

@Component({
	selector: 'app-key-share',
	templateUrl: './key-share.modal.html',
	styleUrls: ['./key-share.modal.scss']
})
export class KeyShareModal implements OnInit {
	@Input() key: string;

	public imageData: string;

	constructor(
		private readonly modalController: ModalController,
		private readonly conversationService: ConversationService,
		private readonly toastController: ToastController
	) {}

	async ngOnInit() {
		let qr = await QRCode
			.toDataURL(
				[
					{
						data: this.key
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

		this.imageData = qr;
	}

	public async copy() {
		let clipboardErr;
		await navigator.clipboard
			.writeText(this.key)
			.catch(err => {
				console.log(err);
				clipboardErr = err;
				return null;
			});

		if(!clipboardErr) {
			const toast = await this.toastController
				.create({
					message: 'Public key copied to clipboard.',
					duration: 2000
				});
			toast.present();
		}
	}

	public async shareQR() {
		if(!navigator.share) {
			window.open(this.imageData, '_blank');
			return;
		}
		
		navigator.share({
			files: [
				new File(
					[ImageUtils.base64ToBlob(this.imageData)],
					`encrypted-message-${Date.now()}.png`,
					{
						type: 'image/png'
					}
				),
			]
		});
	}

	public dismiss() {
		this.modalController.dismiss();
	}
}