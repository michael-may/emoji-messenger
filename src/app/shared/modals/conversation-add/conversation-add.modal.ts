import { Component, ElementRef, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { Contact, ContactService } from '../../../_core/services/contact.service';
import { ConversationService } from '../../../_core/services/conversation.service';
import { EncryptionKey, KeyService } from '../../../_core/services/key.service';

import { ContactAddModal } from '../contact-add/contact-add.modal';
import { KeyAddModal } from '../key-add/key-add.modal';

@Component({
	selector: 'app-conversation-add',
	templateUrl: './conversation-add.modal.html',
	styleUrls: ['./conversation-add.modal.scss']
})
export class ConversationAddModal {
	public contacts$: Observable<Contact[]> = this.contactService
		.contacts$
		.pipe(
			map(arr => arr.sort((a, b) => a.created - b.created))
		);

	public keys$: Observable<EncryptionKey[]> = this.keyService
		.keys$
		.pipe(
			map(arr => arr.sort((a, b) => a.created - b.created))
		);

	public newConversationForm = new FormGroup(
		{
			name: new FormControl('', Validators.required),
			to: new FormControl('', Validators.required),
			from: new FormControl('', Validators.required)
		}
	);

	private saving: boolean = false;

	constructor(
		private readonly conversationService: ConversationService,
		private readonly keyService: KeyService,
		private readonly contactService: ContactService,
		private readonly modalController: ModalController,
		private readonly elementRef: ElementRef
	) {}

	public async addContact() {
		const modal: HTMLIonModalElement = await this.modalController
			.create({
				component: ContactAddModal,
				swipeToClose: true,
				presentingElement: this.elementRef.nativeElement
			});

		await modal.present();
	}

	public async createKey() {
		const modal: HTMLIonModalElement = await this.modalController
			.create({
				component: KeyAddModal,
				swipeToClose: true,
				presentingElement: this.elementRef.nativeElement
			});

		await modal.present();
	}

	public async saveConversation() {
		if(this.saving) {
			return;
		}
		
		this.saving = true;
		const name = this.newConversationForm.get('name').value;
		const to = this.newConversationForm.get('to').value;
		const from = this.newConversationForm.get('from').value;

		const conversationId: string = await this.conversationService
			.addConversation(name, to, from)
			.catch(err => {
				console.log(err);
				return null;
			});

		this.saving = false;

		if(!conversationId) {
			throw new Error(`Couldn't create conversation.`);
		}

		this.dismiss();
	}

	public updateTo(event) {
		this.newConversationForm
			.patchValue({
				to: event.detail?.value
			});
	}

	public updateFrom(event) {
		this.newConversationForm
			.patchValue({
				from: event.detail?.value
			});
	}

	public dismiss() {
		this.modalController.dismiss();
	}
}