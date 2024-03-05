import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ContactAddModal } from 'src/app/shared/modals/contact-add/contact-add.modal';
import { Contact, ContactService } from '../../_core/services/contact.service';

@Component({
	selector: 'app-contacts',
	templateUrl: 'contacts.page.html',
	styleUrls: ['contacts.page.scss'],
})
export class ContactsPage implements OnDestroy {
	public contacts$: Observable<Contact[]> = this.contactService
		.contacts$
		.pipe(
			map(arr => arr.sort((a, b) => a.created - b.created))
		);
	
	constructor(
		private readonly contactService: ContactService,
		private readonly modalController: ModalController,
		private readonly routerOutlet: IonRouterOutlet
	) {}

	ngOnDestroy() {
		
	}

	public async addContact() {
		const modal: HTMLIonModalElement = await this.modalController
			.create({
				component: ContactAddModal,
				canDismiss: async (data?: any, role?: string) => role !== 'gesture',
				presentingElement: this.routerOutlet.nativeEl
			});

		await modal.present();
	}

	public async showPublicKey(key: string) {
		alert(key);
	}

	public async deleteContact(id: string) {
		const confirmed = window.confirm(`Are you absolutely sure? This is unrecoverable without a backup.`);

		if(confirmed) {
			this.contactService.removeContact(id);
		}
	}
}
