import {
	Pipe,
	PipeTransform
} from '@angular/core';

@Pipe({
	name: 'colontodot'
})
export class ColonToDotPipe implements PipeTransform {
	transform(value: string): string {
		return value.replace(/:/g, '.');
	}
}
