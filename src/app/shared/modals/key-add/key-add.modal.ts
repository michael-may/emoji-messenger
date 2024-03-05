import { Component, Input } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

import { EncryptionKey, KeyService } from '../../../_core/services/key.service';

@Component({
	selector: 'app-key-add',
	templateUrl: './key-add.modal.html',
	styleUrls: ['./key-add.modal.scss']
})
export class KeyAddModal {
	public newKeyForm = new UntypedFormGroup(
		{
			name: new UntypedFormControl('', [Validators.required, Validators.minLength(1)]),
			password: new UntypedFormControl('', Validators.minLength(6)),
			passwordConfirm: new UntypedFormControl('', Validators.minLength(6))
		},
		{ validators: this.passwordsMatch.bind(this) }
	);

	private generating: boolean = false;

	constructor(
		private readonly keyService: KeyService,
		private readonly modalController: ModalController
	) {}

	public async saveEncryptionKey() {
		if(this.generating) {
			return;
		}

		this.generating = true;
		const name = this.newKeyForm.get('name').value;
		const password = this.newKeyForm.get('password').value;

		const keyId: string = await this.keyService
			.generateKey(name, password)
			.catch(err => {
				console.log(err);
				return null;
			});

		this.generating = false;

		if(!keyId) {
			throw new Error(`Couldn't generate key pair.`);
		}

		this.newKeyForm.setValue({
			name: '',
			password: '',
			passwordConfirm: ''
		});

		this.dismiss();
	}

	public dismiss() {
		this.modalController.dismiss();
	}

	private passwordsMatch(group: UntypedFormGroup) {
		const password = group.get('password');
		const confirm = group.get('passwordConfirm');

		if(!password.valid || (password.value !== confirm.value)) {
			return {
				NotEqual: true
			}
		}
		return null;
	}
}