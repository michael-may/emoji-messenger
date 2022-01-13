import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';

import { SettingsPage } from './settings.page';

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild([
			{
				path: '',
				component: SettingsPage,
			},
		]),
		ReactiveFormsModule,
		SharedModule
	],
	declarations: [SettingsPage]
})
export class SettingsPageModule {}
