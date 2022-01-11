import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';

import { SharedModule } from '../../../shared/shared.module';

import { ConversationDetailPage } from './conversation-detail.page';

describe('ConversationDetailPage', () => {
	let component: ConversationDetailPage;
	let fixture: ComponentFixture<ConversationDetailPage>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ConversationDetailPage],
			imports: [IonicModule.forRoot(), HttpClientModule, RouterTestingModule, SharedModule],
		}).compileComponents();

		fixture = TestBed.createComponent(ConversationDetailPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	}));

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
