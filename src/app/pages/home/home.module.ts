import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

import { HomePage } from './home.page';

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild([
			{
				path: '',
				component: HomePage
			}
		]),
		FormsModule,
		SharedModule
	],
	declarations: [
		HomePage
	]
})
export class HomePageModule {}
