import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';

import { SharedModule } from '../../shared/shared.module';

import { KeysPage } from './keys.page';

describe('KeysPage', () => {
	let component: KeysPage;
	let fixture: ComponentFixture<KeysPage>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [KeysPage],
			imports: [IonicModule.forRoot(), HttpClientModule, RouterTestingModule, SharedModule],
		}).compileComponents();

		fixture = TestBed.createComponent(KeysPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	}));

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
