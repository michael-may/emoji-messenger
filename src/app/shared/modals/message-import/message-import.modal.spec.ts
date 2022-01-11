import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageImportModal } from './message-import.modal';

describe('MessageImportModal', () => {
	let component: MessageImportModal;
	let fixture: ComponentFixture<MessageImportModal>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [MessageImportModal],
			schemas: [CUSTOM_ELEMENTS_SCHEMA]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(MessageImportModal);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
