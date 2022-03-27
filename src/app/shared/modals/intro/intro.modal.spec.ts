import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroModal } from './intro.modal';

describe('IntroModal', () => {
	let component: IntroModal;
	let fixture: ComponentFixture<IntroModal>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [IntroModal],
			schemas: [CUSTOM_ELEMENTS_SCHEMA]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(IntroModal);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
