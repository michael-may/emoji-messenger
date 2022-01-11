import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';

import { SharedModule } from '../../shared/shared.module';

import { HomePage } from './home.page';

describe('HomePage', () => {
	let component: HomePage;
	let fixture: ComponentFixture<HomePage>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [HomePage],
			imports: [IonicModule.forRoot(), HttpClientModule, RouterTestingModule, SharedModule],
		}).compileComponents();

		fixture = TestBed.createComponent(HomePage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	}));

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
