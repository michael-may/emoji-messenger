import { Component, ElementRef, Input } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import jsQR from 'jsqr';
import { ByteChunk, Chunk } from 'jsqr/dist/decoder/decodeData';

import { Contact, ContactService } from '../../../_core/services/contact.service';

import { ImageUtils } from '../../../_core/utils/image.utils';
import { QRScanModal } from '../qr-scan/qr-scan.modal';

@Component({
	selector: 'app-contact-add',
	templateUrl: './contact-add.modal.html',
	styleUrls: ['./contact-add.modal.scss']
})
export class ContactAddModal {

	public newContactForm = new UntypedFormGroup(
		{
			name: new UntypedFormControl('', [Validators.required, Validators.minLength(1)]),
			publicKey: new UntypedFormControl('', Validators.required),
			file: new UntypedFormControl('')
		}
	);

	private saving: boolean = false;

	constructor(
		private readonly contactService: ContactService,
		private readonly modalController: ModalController,
		private readonly toastController: ToastController,
		private readonly elementRef: ElementRef
	) {}

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

	private async processQR(qr: any) {
		if(qr?.data) {
			const data = qr?.data;

			if(!data) {
				const toast = await this.toastController
					.create({
						message: 'Error importing QR code.',
						duration: 2000
					});
				toast.present();
				return;
			}

			this.newContactForm.patchValue({
				publicKey: data
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

	public async scanQR() {
		const modal: HTMLIonModalElement = await this.modalController
			.create({
				component: QRScanModal,
				canDismiss: async (data?: any, role?: string) => role !== 'gesture',
				presentingElement: this.elementRef.nativeElement
			});

		await modal.present();

		const result = await modal.onDidDismiss();

		if(result?.data) {
			this.processQR(result.data);
		}
	}

	public async saveContact() {
		if(this.saving) {
			return;
		}
		
		this.saving = true;
		const name = this.newContactForm.get('name').value;
		const publicKey = this.newContactForm.get('publicKey').value;

		const contactId: string = await this.contactService
			.addContact(name, publicKey)
			.catch(err => {
				console.log(err);
				return null;
			});

		this.saving = false;

		if(!contactId) {
			throw new Error(`Couldn't import contact.`);
		}

		this.dismiss();
	}

	public dismiss() {
		this.modalController.dismiss();
	}
}