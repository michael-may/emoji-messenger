import { Component, ElementRef, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ImageUtils } from '../../../_core/utils/image.utils';

import { Crypto } from '../../../_core/utils/crypto.utils';

import { IMAGE_SIZE } from '../../../_core/constants';

@Component({
	selector: 'app-message-add',
	templateUrl: './message-add.modal.html',
	styleUrls: ['./message-add.modal.scss']
})
export class MessageAddModal {
	@Input() fromName: string;
	@Input() toName: string;
	@Input() toKey: CryptoKey;
	@Output('image') image: EventEmitter<String> = new EventEmitter<String>();

	@ViewChild('canvas') canvas: ElementRef<HTMLCanvasElement>;

	private encrypted: ArrayBuffer;
	public renderedImage;
	private localImage;

	public showEmojiPicker: boolean = false;
	public pickedEmoji: string = '';

	public readonly MAX_ENCODED_BYTES: number = 382;
	public encodedBytes: number = 0;

	public newMessageForm = new FormGroup(
		{
			//saveLocal: new FormControl(false),
			backgroundColor: new FormControl('#ffffff'),
			message: new FormControl('', [Validators.required, this.checkMessageLength.bind(this)])
		}
	);

	constructor(
		private readonly modalController: ModalController
	) {}

	public clearBackgroundColor() {
		this.newMessageForm
			.patchValue({
				backgroundColor: '#ffffff'
			});

		if(this.newMessageForm.valid) {
			this.encrypt().catch(err => console.log(err));
		}
	}

	public setBackgroundColor() {
		if(this.newMessageForm.valid) {
			this.encrypt().catch(err => console.log(err));
		}
	}

	public setBackground(value) {
		this.pickedEmoji = value;
		this.showEmojiPicker = false;
		if(this.newMessageForm.valid) {
			this.encrypt().catch(err => console.log(err));
		}
	}

	public async encrypt() {
		this.renderedImage = null;

		if(!this.toKey) {
			throw new Error('Public key not found.');
		}

		const value = this.newMessageForm.get('message')?.value;

		if(!value || !this.newMessageForm.valid) {
			throw new Error(`Nothing to encode.`);
		}

		this.encrypted = await Crypto.encrypt(value, this.toKey)
			.catch(err => {
				console.log(err);
				return undefined;
			});

		if(!this.encrypted) {
			return;
		}

		const data = new Uint8Array(this.encrypted);
		const minPx = Math.ceil(data.length);
		const remainder = 3 - data.length % 3;
		const nextPow = Math.max(1 << (32 - Math.clz32(Math.ceil(Math.sqrt(minPx)))), IMAGE_SIZE);
		const density = Math.floor((nextPow * nextPow) / minPx);

		this.canvas.nativeElement.width = nextPow;
		this.canvas.nativeElement.height = nextPow;
		const ctx = this.canvas.nativeElement.getContext('2d');

		ctx.clearRect(0, 0, nextPow, nextPow);
		const backgroundColor = this.newMessageForm.get('backgroundColor').value;
		ctx.fillStyle = `rgba(
				${parseInt(backgroundColor[1] + backgroundColor[2], 16)},
				${parseInt(backgroundColor[3] + backgroundColor[4], 16)},
				${parseInt(backgroundColor[5] + backgroundColor[6], 16)},
				255
			)
		`;
		ctx.fillRect(0, 0, nextPow, nextPow);

		if(this.pickedEmoji) {
			let fontSize = nextPow;
			ctx.font = `${fontSize}px sans-serif`;
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';
			
			let measure = ctx.measureText(this.pickedEmoji);

			if(measure.width > nextPow) {
				fontSize /= measure.width / nextPow;
				ctx.font = `${fontSize}px sans-serif`;
			}

			ctx.fillText(this.pickedEmoji, nextPow / 2, nextPow / 2);
		}

		let img = ctx.getImageData(0, 0, nextPow, nextPow);

		for(let i = 0; i < (data.length + remainder); i++) {
			const imgIdx = (i * density) * 4;
			img.data[imgIdx + 3] = data[i];
		}

		const blob = await ImageUtils
			.create([...img.data], nextPow, nextPow)
			.catch(err => {
				console.log(err);
				return null;
			});

		this.renderedImage = await ImageUtils.blobToBase64(blob)
			.catch(err => {
				console.log(err);
				return null;
			});

		if(!this.renderedImage) {
			throw new Error(`Error rendering image.`);
		}

		ctx.putImageData(img, 0, 0);
	}

	public async saveMessage() {
		this.dismiss(this.renderedImage);
	}

	public countBytes(value?: string) {
		if(!value?.length) {
			value = this.newMessageForm?.get('message').value || '';
		}
		this.encodedBytes = new TextEncoder().encode(value).byteLength;
	}

	private checkMessageLength(group: FormGroup) {
		const message = group?.get('message')?.value || '';
		this.countBytes(message);
		if(this.encodedBytes > this.MAX_ENCODED_BYTES) {
			return {
				TooLong: true
			}
		}
		return null;
	}

	public dismiss(image?: string) {
		this.modalController.dismiss({
			image,
			encrypted: Array.from(new Uint8Array(this.encrypted)),
			emoji: this.pickedEmoji,
			backgroundColor: this.newMessageForm.get('backgroundColor').value
		});
	}
}