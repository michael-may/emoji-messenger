import { Component, ElementRef, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import jsQR from 'jsqr';
import { ByteChunk, Chunk } from 'jsqr/dist/decoder/decodeData';

import { ImageUtils } from '../../../_core/utils/image.utils';
import { QRScanModal } from '../qr-scan/qr-scan.modal';

@Component({
	selector: 'app-message-import',
	templateUrl: './message-import.modal.html',
	styleUrls: ['./message-import.modal.scss']
})
export class MessageImportModal {
	@Input() fromName: string;
	@Input() toName: string;
	@Output('image') image: EventEmitter<String> = new EventEmitter<String>();

	public importedFile;

	public newMessageForm = new UntypedFormGroup(
		{
			file: new UntypedFormControl(''),
		}
	);

	constructor(
		private readonly modalController: ModalController,
		private readonly toastController: ToastController,
		private readonly elementRef: ElementRef
	) {}

	public async parseFile(event) {
		if(!event.target.files?.length) {
			return;
		}

		const fileData = await ImageUtils.fileToBase64(event.target.files[0])
			.catch(err => {
				console.log(err);
				return null;
			});

		if(!fileData) {
			const toast = await this.toastController
				.create({
					message: `Couldn't parse file.`,
					duration: 2000
				});
			toast.present();
			return;
		}

		this.importedFile = fileData;
	}

	public async parseFileQR(event) {
		if(!event.target.files?.length) {
			return;
		}

		const fileData = await ImageUtils.fileToBase64(event.target.files[0])
			.catch(err => {
				console.log(err);
				return null;
			});

		if(!fileData) {
			const toast = await this.toastController
				.create({
					message: `Couldn't load file.`,
					duration: 2000
				});
			toast.present();
			return;
		}

		const im: ImageData = await ImageUtils.base64ToImageData(fileData)
			.catch(err => {
				console.log(err);
				return null;
			});

		if(!im) {
			const toast = await this.toastController
				.create({
					message: `Couldn't load file.`,
					duration: 2000
				});
			toast.present();
			return;
		}

		this.processQR(jsQR(im.data, im.width, im.height));
	}

	public async scanQR() {
		const modal: HTMLIonModalElement = await this.modalController
			.create({
				component: QRScanModal,
				canDismiss: true,
				presentingElement: this.elementRef.nativeElement
			});

		await modal.present();

		const result = await modal.onDidDismiss();

		console.log(result);

		if(result?.data) {
			this.processQR(result.data);
		}
	}

	private async processQR(qr: any) {
		if(qr?.chunks?.length && qr?.binaryData) {
			let dataRaw = (qr.chunks[0] as ByteChunk)?.bytes;
			let emoji = (qr.chunks[1] as Chunk)?.text;
			let backgroundColor = (qr.chunks[2] as Chunk)?.text;

			if(!dataRaw) {
				const toast = await this.toastController
					.create({
						message: 'Error importing QR code.',
						duration: 2000
					});
				toast.present();
				return;
			}

			this.importedFile = await ImageUtils
				.createImageData(
					dataRaw,
					emoji,
					backgroundColor
				)
				.catch(err => {
					console.log(err);
				});
		} else {
			const toast = await this.toastController
				.create({
					message: 'Invalid QR data.',
					duration: 2000
				});
			toast.present();
			return;
		}
	}

	public async saveMessage() {
		this.dismiss(this.importedFile);
	}

	public dismiss(image?: string) {
		this.modalController.dismiss({
			image
		});
	}
}