import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EncodedImageComponent } from './encoded-image.component';

describe('EncodedImageComponent', () => {
	let component: EncodedImageComponent;
	let fixture: ComponentFixture<EncodedImageComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [EncodedImageComponent],
			schemas: [CUSTOM_ELEMENTS_SCHEMA]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(EncodedImageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
