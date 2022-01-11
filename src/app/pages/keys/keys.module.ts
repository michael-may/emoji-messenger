import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';

import { KeysPage } from './keys.page';

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild([
			{
				path: '',
				component: KeysPage,
			},
		]),
		ReactiveFormsModule,
		SharedModule
	],
	declarations: [KeysPage]
})
export class KeysPageModule {}
