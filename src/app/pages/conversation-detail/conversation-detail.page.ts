import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IonContent, IonRouterOutlet, ModalController } from '@ionic/angular';

import { Conversation, ConversationService, Message, MessageType } from '../../_core/services/conversation.service';
import { EncryptionKey, KeyService } from '../../_core/services/key.service';
import { Contact, ContactService } from '../../_core/services/contact.service';

import { MessageAddModal } from '../../shared/modals/message-add/message-add.modal';
import { MessageShareModal } from '../../shared/modals/message-share/message-share.modal';
import { MessageImportModal } from '../../shared/modals/message-import/message-import.modal';
import { MessageViewModal } from '../../shared/modals/message-view/message-view.modal';

@Component({
	selector: 'app-conversation-detail',
	templateUrl: 'conversation-detail.page.html',
	styleUrls: ['conversation-detail.page.scss'],
})
export class ConversationDetailPage implements OnInit, AfterViewInit {

	@ViewChild(IonContent, { static: false }) content: IonContent;

	public contact$: Observable<Contact>;
	public key$: Observable<EncryptionKey>;
	public conversation$: Observable<Conversation>;

	public id: string;
	public name: string = '';
	public contact: Contact;
	public key: EncryptionKey;

	public get MessageType() {
		return MessageType;
	}

	constructor(
		private readonly route: ActivatedRoute,
		private readonly keyService: KeyService,
		private readonly conversationService: ConversationService,
		private readonly contactService: ContactService,
		private readonly modalController: ModalController,
		private readonly routerOutlet: IonRouterOutlet
	) {}

	ngOnInit() {
		this.id = this.route.snapshot.paramMap.get('id');
		this.conversation$ = this.conversationService
			.getConversation(this.id)
			.pipe(
				tap(c => {
					if(!c) {
						return;
					}
					this.name = c.name;
					if(!this.contact$) {
						this.loadContact(c.toKeyId);
					}
					if(!this.key$) {
						this.loadKey(c.fromKeyId);
					}
					this.scrollToBottom();
				})
			);
	}

	ngOnDestroy() {

	}

	ngAfterViewInit() {
		setTimeout(() => this.scrollToBottom(), 500);
	}

	public scrollToBottom() {
		if(!this.content?.scrollToBottom) {
			return;
		}
		this.content
			.scrollToBottom(250)
			.catch(err => {
				console.log(err);
			});
	}

	private loadContact(id: string) {
		this.contact$ = this.contactService
			.getContact(id)
			.pipe(
				tap(c => this.contact = c )
			);
	}

	private loadKey(id: string) {
		this.key$ = this.keyService
			.getkey(id)
			.pipe(
				tap(k => this.key = k)
			);
	}

	public async createMessage() {
		const modal: HTMLIonModalElement = await this.modalController
			.create({
				component: MessageAddModal,
				swipeToClose: true,
				presentingElement: this.routerOutlet.nativeEl,
				componentProps: {
					fromName: this.key?.name,
					toName: this.contact?.name,
					toKey: this.contact?.publicKeyImported
				}
			});

		await modal.present();

		const result = await modal.onDidDismiss();

		if(result?.data?.image) {
			this.conversationService
				.addMessage(
					this.id,
					{
						type: MessageType.Outgoing,
						imageData: result.data.image,
						emoji: result.data?.emoji,
						backgroundColor: result.data?.backgroundColor,
						dataRaw: result.data?.encrypted
					}
				);
		}

		setTimeout(() => this.scrollToBottom(), 500);
	}

	public async importMessage() {
		const modal: HTMLIonModalElement = await this.modalController
			.create({
				component: MessageImportModal,
				swipeToClose: true,
				presentingElement: this.routerOutlet.nativeEl,
				componentProps: {
					fromName: this.contact?.name,
					toName: this.key?.name
				}
			});

		await modal.present();

		const result = await modal.onDidDismiss();

		if(result?.data?.image) {
			this.conversationService
				.addMessage(
					this.id,
					{
						type: MessageType.Incoming,
						imageData: result.data.image
					}
				);
		}

		this.scrollToBottom();
	}

	public async decodeMessage(message: Message) {
		if(!this.contact || !this.key) {
			return;
		}
		if(message.type === MessageType.Outgoing) {
			const modal: HTMLIonModalElement = await this.modalController
				.create({
					component: MessageShareModal,
					swipeToClose: true,
					presentingElement: this.routerOutlet.nativeEl,
					componentProps: {
						message,
						conversationId: this.id
					}
				});

			await modal.present();

			await modal.onDidDismiss();

			return;
		} else if(message.type === MessageType.Incoming) {
			const modal: HTMLIonModalElement = await this.modalController
				.create({
					component: MessageViewModal,
					swipeToClose: true,
					presentingElement: this.routerOutlet.nativeEl,
					componentProps: {
						message,
						conversationId: this.id,
						key: this.key
					}
				});

			await modal.present();

			await modal.onDidDismiss();
		}
	}

	public async deleteMessage(id: string) {
		this.conversationService
			.deleteConversation(id);
	}

}
