import { Component } from '@angular/core';

@Component({
	selector: 'app-version',
	templateUrl: './version-number.component.html',
	styleUrls: ['./version-number.component.scss']
})
export class VersionNumberComponent {
	public version: string;

	constructor() {
		// tslint:disable-next-line: no-string-literal
		this.version = window['appVersion' as keyof Window] as string;
	}
}
