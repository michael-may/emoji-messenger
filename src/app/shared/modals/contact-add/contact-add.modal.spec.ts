import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactAddModal } from './contact-add.modal';

describe('ContactAddModal', () => {
	let component: ContactAddModal;
	let fixture: ComponentFixture<ContactAddModal>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ContactAddModal],
			schemas: [CUSTOM_ELEMENTS_SCHEMA]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ContactAddModal);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
