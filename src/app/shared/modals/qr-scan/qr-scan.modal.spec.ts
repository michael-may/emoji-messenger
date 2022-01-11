import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QRScanModal } from './qr-scan.modal';

describe('QRScanModal', () => {
	let component: QRScanModal;
	let fixture: ComponentFixture<QRScanModal>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [QRScanModal],
			schemas: [CUSTOM_ELEMENTS_SCHEMA]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(QRScanModal);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
