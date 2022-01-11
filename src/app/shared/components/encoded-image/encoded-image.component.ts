import { AfterViewInit, Component, Input } from '@angular/core';

import { ImageUtils } from '../../../_core/utils/image.utils';
import { IMAGE_SIZE } from '../../../_core/constants';

@Component({
	selector: 'app-encoded-image',
	templateUrl: './encoded-image.component.html',
	styleUrls: ['./encoded-image.component.scss']
})
export class EncodedImageComponent implements AfterViewInit {

	@Input('emoji') emoji: string;
	@Input('backgroundColor') backgroundColor: string;
	@Input('dataRaw') dataRaw: number[];
	
	public renderedImage;

	constructor() {}

	async ngAfterViewInit() {
		this.renderedImage = await ImageUtils
			.createImageData(
				this.dataRaw,
				this.emoji,
				this.backgroundColor
			).catch(err => {
				console.log(err);
			});
	}

	
}
