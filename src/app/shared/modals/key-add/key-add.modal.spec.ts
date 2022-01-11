import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyAddModal } from './key-add.modal';

describe('KeyAddModal', () => {
	let component: KeyAddModal;
	let fixture: ComponentFixture<KeyAddModal>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [KeyAddModal],
			schemas: [CUSTOM_ELEMENTS_SCHEMA]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(KeyAddModal);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
