import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IntroModal } from './modals/intro/intro.modal';
import { ConversationAddModal } from './modals/conversation-add/conversation-add.modal';
import { ContactAddModal } from './modals/contact-add/contact-add.modal';
import { KeyAddModal } from './modals/key-add/key-add.modal';
import { MessageAddModal } from './modals/message-add/message-add.modal';
import { MessageShareModal } from './modals/message-share/message-share.modal';
import { MessageImportModal } from './modals/message-import/message-import.modal';
import { MessageViewModal } from './modals/message-view/message-view.modal';
import { KeyShareModal } from './modals/key-share/key-share.modal';
import { QRScanModal } from './modals/qr-scan/qr-scan.modal';

import { EmojiPickerComponent } from './components/emoji-picker/emoji-picker.component';
import { EncodedImageComponent } from './components/encoded-image/encoded-image.component';
import { QRScannerComponent } from './components/qr-scanner/qr-scanner.component';
import { VersionNumberComponent } from './components/version-number/version-number.component';
import { ColonToDotPipe } from './pipes/colon-to-dot.pipe';
import { SafeUrlPipe } from './pipes/safe-url.pipe';

@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		FormsModule,
		ReactiveFormsModule,
		IonicModule
	],
	declarations: [
		IntroModal,
		ConversationAddModal,
		ContactAddModal,
		KeyAddModal,
		MessageAddModal,
		MessageShareModal,
		MessageImportModal,
		MessageViewModal,
		KeyShareModal,
		QRScanModal,
		EmojiPickerComponent,
		EncodedImageComponent,
		QRScannerComponent,
		VersionNumberComponent,
		ColonToDotPipe,
		SafeUrlPipe
	],
	providers: [
		IonicModule
	],
	exports: [
		IonicModule,
		CommonModule,
		IntroModal,
		ConversationAddModal,
		ContactAddModal,
		KeyAddModal,
		MessageAddModal,
		MessageShareModal,
		MessageImportModal,
		MessageViewModal,
		KeyShareModal,
		QRScanModal,
		EmojiPickerComponent,
		EncodedImageComponent,
		QRScannerComponent,
		VersionNumberComponent,
		ColonToDotPipe,
		SafeUrlPipe
	]
})
export class SharedModule {}
