import { Component, EventEmitter, Output } from '@angular/core';

import { EmojiList, Emojis } from './emoji-picker.data';

@Component({
	selector: 'app-emoji-picker',
	templateUrl: './emoji-picker.component.html',
	styleUrls: ['./emoji-picker.component.scss']
})
export class EmojiPickerComponent {
	@Output('selected') selected: EventEmitter<string> = new EventEmitter<string>();
	
	public selectedEmojis: string = '';

	public emojiLists: EmojiList[] = Emojis;

	constructor() {}

	public addEmoji(value: string) {
		this.selected.emit(value);
	}
}
