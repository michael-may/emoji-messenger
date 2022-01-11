import { NgModule, Optional, SkipSelf, ErrorHandler } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { KeyService } from './services/key.service';
import { ContactService } from './services/contact.service';
import { ConversationService } from './services/conversation.service';

@NgModule({
	imports: [
		CommonModule,
		HttpClientModule
	],
	exports: [],
	declarations: [],
	providers: [
		KeyService,
		ContactService,
		ConversationService
	]
})
export class CoreModule {
	constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
		if (parentModule) {
			throw new Error(`Core Module has already been loaded. Import Core modules in the AppModule only.`);
		}
	}
}
