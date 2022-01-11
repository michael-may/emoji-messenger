import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QRScannerComponent } from './qr-scanner.component';

describe('QRScannerComponent', () => {
	let component: QRScannerComponent;
	let fixture: ComponentFixture<QRScannerComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [QRScannerComponent],
			schemas: [CUSTOM_ELEMENTS_SCHEMA]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(QRScannerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
