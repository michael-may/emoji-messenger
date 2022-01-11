import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';

import { ContactsPage } from './contacts.page';

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild([
			{
				path: '',
				component: ContactsPage,
			}
		]),
		ReactiveFormsModule,
		SharedModule
	],
	declarations: [ContactsPage]
})
export class ContactsPageModule {}
