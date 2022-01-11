import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyShareModal } from './key-share.modal';

describe('KeyShareModal', () => {
	let component: KeyShareModal;
	let fixture: ComponentFixture<KeyShareModal>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [KeyShareModal],
			schemas: [CUSTOM_ELEMENTS_SCHEMA]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(KeyShareModal);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
