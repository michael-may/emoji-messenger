import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
	selector: 'app-intro',
	templateUrl: './intro.modal.html',
	styleUrls: ['./intro.modal.scss']
})
export class IntroModal {
	constructor(
		private readonly modalController: ModalController
	) {}

	public dismiss() {
		this.modalController.dismiss();
	}
}