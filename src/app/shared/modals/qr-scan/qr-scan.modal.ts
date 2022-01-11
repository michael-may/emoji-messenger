import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
	selector: 'app-qr-scan-modal',
	templateUrl: './qr-scan.modal.html',
	styleUrls: ['./qr-scan.modal.scss']
})
export class QRScanModal {
	public doneScanning: boolean = false;

	constructor(
		private readonly modalController: ModalController
	) {}

	public onData(event) {
		this.dismiss(event);
	}

	public dismiss(data?) {
		this.doneScanning = true;
		this.modalController.dismiss(data);
	}
}