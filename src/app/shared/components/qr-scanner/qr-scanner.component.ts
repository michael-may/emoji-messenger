import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges, ViewChild } from '@angular/core';

import jsQR from 'jsqr';

@Component({
	selector: 'app-qr-scanner',
	templateUrl: './qr-scanner.component.html',
	styleUrls: ['./qr-scanner.component.scss']
})
export class QRScannerComponent implements AfterViewInit, OnDestroy, OnChanges {

	@Input('done') done: boolean;
	@Output('data') data: EventEmitter<any> = new EventEmitter();
	
	@ViewChild('cam') cam: ElementRef<HTMLVideoElement>;

	private canvas: HTMLCanvasElement = document.createElement('canvas');
	private ctx: CanvasRenderingContext2D = this.canvas.getContext('2d');
	private mediaStream: MediaStream;
	public renderedImage;

	private scanning: boolean = false;
	private scanningTimeout;

	constructor() {}

	async ngAfterViewInit() {
		await this.getCamera()
			.catch(err => {
				console.log(err);
			});
	}

	ngOnDestroy() {
		this.scanning = false;
		this.cam.nativeElement.pause();
		this.mediaStream
			.getTracks()
			.forEach(track => {
				track.stop();
			});
	}

	ngOnChanges(changes: SimpleChanges) {
		if(changes.done.currentValue) {
			this.scanning = false;
			this.ngOnDestroy();
		}
	}

	private async getCamera() {
		const constraints = {
			video: { facingMode: 'environment' },
		};
		const stream: MediaStream = await navigator.mediaDevices
			.getUserMedia(constraints)
			.catch(err => {
				console.log(err);
				return null;
			});

		if(!stream) {
			return;
		}

		this.mediaStream = stream;
		this.cam.nativeElement.srcObject = this.mediaStream;
		this.cam.nativeElement.addEventListener('loadeddata', this.startLoop.bind(this));
	}

	private startLoop() {
		this.scanning = true;
		this.canvas.width = this.cam.nativeElement.videoWidth;
		this.canvas.height = this.cam.nativeElement.videoHeight;
		this.animationLoop();
	}

	private animationLoop() {
		if(!this.scanning) {
			return;
		}

		this.ctx.drawImage(this.cam.nativeElement, 0, 0);

		const im = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);

		let qr = jsQR(im.data, im.width, im.height);
		
		if(qr) {
			this.data.emit(qr);
		}

		if(this.scanningTimeout) {
			clearTimeout(this.scanningTimeout);
		}

		this.scanningTimeout = setTimeout(() => {
			this.animationLoop();
		}, 500);
	}
}
