import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageShareModal } from './message-share.modal';

describe('MessageShareModal', () => {
	let component: MessageShareModal;
	let fixture: ComponentFixture<MessageShareModal>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [MessageShareModal],
			schemas: [CUSTOM_ELEMENTS_SCHEMA]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(MessageShareModal);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
