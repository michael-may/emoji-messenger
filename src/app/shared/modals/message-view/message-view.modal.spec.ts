import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageViewModal } from './message-view.modal';

describe('MessageViewModal', () => {
	let component: MessageViewModal;
	let fixture: ComponentFixture<MessageViewModal>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [MessageViewModal],
			schemas: [CUSTOM_ELEMENTS_SCHEMA]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(MessageViewModal);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
