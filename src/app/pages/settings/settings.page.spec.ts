import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';

import { SharedModule } from '../../shared/shared.module';

import { SettingsPage } from './settings.page';

describe('SettingsPage', () => {
	let component: SettingsPage;
	let fixture: ComponentFixture<SettingsPage>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [SettingsPage],
			imports: [IonicModule.forRoot(), HttpClientModule, RouterTestingModule, SharedModule],
		}).compileComponents();

		fixture = TestBed.createComponent(SettingsPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	}));

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
