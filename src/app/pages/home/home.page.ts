import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IonRouterOutlet, ModalController } from '@ionic/angular';

import { Conversation, ConversationService } from '../../_core/services/conversation.service';
import { EncryptionKey, KeyService } from '../../_core/services/key.service';
import { Contact, ContactService } from '../../_core/services/contact.service';

import { ConversationAddModal } from '../../shared/modals/conversation-add/conversation-add.modal';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})
export class HomePage {
	public contacts$: Observable<Contact[]> = this.contactService
		.contacts$;

	public keys$: Observable<EncryptionKey[]> = this.keyService
		.keys$;

	public conversations$: Observable<Conversation[]> = this.conversationService
		.conversations$
		.pipe(
			map(arr => arr.sort((a, b) => a.created - b.created))
		);

	constructor(
		private readonly keyService: KeyService,
		private readonly conversationService: ConversationService,
		private readonly contactService: ContactService,
		private readonly modalController: ModalController,
		private readonly routerOutlet: IonRouterOutlet
	) {}

	public async addConversation() {
		const modal: HTMLIonModalElement = await this.modalController
			.create({
				component: ConversationAddModal,
				canDismiss: true,
				presentingElement: this.routerOutlet.nativeEl
			});

		await modal.present();
	}

	public async deleteConversation(id: string) {
		const confirmed = window.confirm(`Are you absolutely sure? This is unrecoverable without a backup.`);

		if(confirmed) {
			this.conversationService
				.deleteConversation(id);
		}
	}
}
