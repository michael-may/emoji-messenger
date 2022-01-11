import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversationAddModal } from './conversation-add.modal';

describe('ConversationAddModal', () => {
	let component: ConversationAddModal;
	let fixture: ComponentFixture<ConversationAddModal>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ConversationAddModal],
			schemas: [CUSTOM_ELEMENTS_SCHEMA]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ConversationAddModal);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
