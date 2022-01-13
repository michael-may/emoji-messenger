import { Component, OnDestroy } from '@angular/core';
import { IonRouterOutlet, ModalController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { KeyAddModal } from '../../shared/modals/key-add/key-add.modal';
import { KeyShareModal } from '../../shared/modals/key-share/key-share.modal';

import { EncryptionKey, KeyService } from '../../_core/services/key.service';

@Component({
	selector: 'app-keys',
	templateUrl: 'keys.page.html',
	styleUrls: ['keys.page.scss'],
})
export class KeysPage implements OnDestroy {
	public keys$: Observable<EncryptionKey[]> = this.keyService
		.keys$
		.pipe(
			map(arr => arr.sort((a, b) => a.created - b.created))
		);
	
	constructor(
		private readonly keyService: KeyService,
		private readonly modalController: ModalController,
		private readonly toastController: ToastController,
		private readonly routerOutlet: IonRouterOutlet
	) {}

	ngOnDestroy() {
		
	}

	public async generateKey() {
		const modal: HTMLIonModalElement = await this.modalController
			.create({
				component: KeyAddModal,
				swipeToClose: true,
				presentingElement: this.routerOutlet.nativeEl
			});

		await modal.present();
	}

	public async unlockKey(id: string) {
		const password = window.prompt('Enter the password for this key.');
		let result = await this.keyService
			.unlockKey(id, password)
			.catch(err => {
				console.log(err);
				return null;
			});

		if(!result) {
			alert(`Couldn't unlock key with the given password.`);
		}
	}

	public async showPublicKey(key: string) {
		let clipboardErr;
		await navigator.clipboard
			.writeText(key)
			.catch(err => {
				console.log(err);
				clipboardErr = err;
				return null;
			});
		alert(key);
		if(!clipboardErr) {
			const toast = await this.toastController
				.create({
					message: 'Public key copied to clipboard.',
					duration: 2000
				});
			toast.present();
		}
	}

	public async shareKey(key: string) {
		const modal: HTMLIonModalElement = await this.modalController
			.create({
				component: KeyShareModal,
				swipeToClose: true,
				presentingElement: this.routerOutlet.nativeEl,
				componentProps: {
					key
				}
			});

		await modal.present();
	}

	public async deleteKey(id: string) {
		const confirmed = window.confirm(`Are you absolutely sure? This is unrecoverable without a backup.`);

		if(confirmed) {
			this.keyService.removeKey(id);
		}
	}
}
