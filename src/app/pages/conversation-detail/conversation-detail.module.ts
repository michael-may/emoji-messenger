import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

import { ConversationDetailPage } from './conversation-detail.page';

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild([
			{
				path: '',
				component: ConversationDetailPage
			}
		]),
		FormsModule,
		SharedModule
	],
	declarations: [
		ConversationDetailPage
	]
})
export class ConversationDetailPageModule {}
