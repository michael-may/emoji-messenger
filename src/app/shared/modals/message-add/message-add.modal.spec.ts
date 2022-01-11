import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageAddModal } from './message-add.modal';

describe('MessageAddModal', () => {
	let component: MessageAddModal;
	let fixture: ComponentFixture<MessageAddModal>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [MessageAddModal],
			schemas: [CUSTOM_ELEMENTS_SCHEMA]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(MessageAddModal);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
