/*
	PNG Format
	File Header:	0x00 - 0x08
	Chunks:
		LEN:		0x00 - 0x03 (Uint32)
		Type: 		0x04 - 0x07 (Uint32)
		Data?:		0x08 - ????
		CRC:		???? - ???? (After Data) (UInt32)
*/

import { Inflate } from '../third-party/pako.js/pako_inflate.min';
import { Deflate } from '../third-party/pako.js/pako_deflate.min';

import { IMAGE_SIZE } from '../constants';

export class ChunkInfo {
	pos: number;
	len: number;
	type: string;
}

export class IHDRData {
	width: number;
	height: number;
	bitDepth: number;
	colorType: number;
	compressionMethod: number;
	filterMethod: number;
	interlaceMethod: number;
}

export class ColorPixel {
	r: number;
	g: number;
	b: number;
}

export class ImageUtils {
	private static readonly CRC32_Table = ImageUtils.createCRC32Table();

	public static async create(imageData: number[], width: number, height: number) {
		const headerValues = [137, 80, 78, 71, 13, 10, 26, 10];
		
		const scanLines: number[] = [];
		for(const line of this.writePixels(imageData, width, height)) {
			scanLines.push(...line);
		}

		const deflated: number[] = await this.getDeflatedData(new Uint8Array(scanLines))
			.catch(err => {
				console.log(err);
				return null;
			});

		if(!deflated) {
			throw new Error(`Couldn't deflate data.`);
		}

		let file = new Uint8Array(
			8 +					// PNG Header
			8 +					// IHDR Len + FourCC
			13 +				// IHDR Data
			4 +					// IHDR CRC
			// 8 +					// sRGB Len + FourCC
			// 1 +					// sRGB Data
			// 4 +					// sRGB CRC
			8 +					// IDAT Len + FourCC
			deflated.length +	// IDAT Data
			4 +					// IDAT CRC
			8 +					// IEND Len + FourCC
			4					// IEND CRC
		);

		const dv = new DataView(file.buffer);
		let pos = 0x0;

		// Write PNG Header
		for(const h of headerValues) {
			dv.setUint8(pos, h);
			pos++;
		}

		// Write IHDR
		// Data size
		dv.setUint32(pos, 13);
		// FourCC
		dv.setUint32(pos += 4, this.makeFourCC('IHDR'));
		// Data
		let dataStart = pos + 4;
		dv.setUint32(pos += 4, width);
		dv.setUint32(pos += 4, height);
		// Bit depth (8 bpp)
		dv.setUint8(pos += 4, 8);
		// Color type (6, True color + alpha)
		dv.setUint8(pos += 1, 6);
		// Compression method (0)
		dv.setUint8(pos += 1, 0);
		// Filter method (0)
		dv.setUint8(pos += 1, 0);
		// Interlace method (0)
		dv.setUint8(pos += 1, 0);
		// CRC
		dv.setUint32(pos += 1, this.calcCRC(new Uint8Array(dv.buffer, dataStart - 4, 13 + 4)));

		// // Write sRGB
		// // Data size
		// dv.setUint32(pos += 4, 1);
		// // FourCC
		// dv.setUint32(pos += 4, this.makeFourCC('sRGB'));
		// dataStart = pos + 4;
		// // Data (3, sRGB Absolute)
		// dv.setUint8(pos += 4, 3);
		// // CRC
		// dv.setUint32(pos += 1, this.calcCRC(new Uint8Array(dv.buffer, dataStart - 4, 1 + 4)));
		
		// Write IDAT
		// Data size
		dv.setUint32(pos += 4, deflated.length);
		// FourCC
		dv.setUint32(pos += 4, this.makeFourCC('IDAT'));
		// Data
		dataStart = pos += 4;
		for(const d of deflated) {
			dv.setUint8(pos, d);
			pos++;
		}
		// CRC
		dv.setUint32(pos, this.calcCRC(new Uint8Array(dv.buffer, dataStart - 4, deflated.length + 4)));

		// Write IEND
		// Data size
		dv.setUint32(pos += 4, 0);
		// FourCC
		dv.setUint32(pos += 4, this.makeFourCC('IEND'));
		// CRC
		dv.setUint32(pos + 4, this.calcCRC(new Uint8Array(dv.buffer, pos, 4)));

		return new Blob([dv.buffer], { type: 'image/png' });
	}

	private static* writePixels(data: number[], width: number, height: number) {
		let writing = true;
		let line = 0;
		let dataPos = 0;
		let lineLength = (width * 4) + 1;
		while(writing) {
			//let offset = line * lineLength;
			let pixels = [];
			for(let c = 0; c < lineLength; c++) {
				if(c === 0) {
					pixels.push(0x0);
				} else {
					pixels.push(data[dataPos]);
					dataPos++;
				}
			}

			yield pixels;

			line++;
			if(line === height) {
				writing = false;
			}
		}
	}

	public static async read(imageString: string) {
		const arr = Uint8Array.from(atob(imageString.split('base64,')[1]), c => c.charCodeAt(0));
		const chunks: ChunkInfo[] = [];
		const dv = new DataView(arr.buffer);

		// Start at the end of the PNG header
		for(let chunk of this.getChunks(dv)) {
			chunks.push(chunk);
		}

		// console.log(chunks);

		let ihdr: IHDRData = await this.getIHDRData(dv, chunks.find(c => c.type === 'IHDR'));

		//console.log(ihdr);

		let inflated: Uint8Array = await this.getInflatedData(dv, chunks.filter(c => c.type === 'IDAT'))
			.catch(err => {
				console.log(err);
				return null;
			});

		let pixels = [];
		for(const row of this.getPixels(inflated, ihdr.width, ihdr.height)) {
			pixels.push(...row);
		}
		
		return pixels;
	}

	private static async getIHDRData(dv: DataView, chunk: ChunkInfo) {
		/*
			Width:				4 bytes
			Height:				4 bytes
			Bit depth:			1 byte
			Color type:			1 byte
			Compression method:	1 byte
			Filter method:		1 byte
			Interlace method:	1 byte
		*/
		let pos = chunk.pos + 8;
		const width = dv.getUint32(pos);
		const height = dv.getUint32(pos + 4);
		const bitDepth = dv.getUint8(pos + 8);
		const colorType = dv.getUint8(pos + 9);
		const compressionMethod = dv.getUint8(pos + 10);
		const filterMethod = dv.getUint8(pos + 11);
		const interlaceMethod = dv.getUint8(pos + 12);

		return {
			width,
			height,
			bitDepth,
			colorType,
			compressionMethod,
			filterMethod,
			interlaceMethod
		};
	}

	public static async getDeflatedData(data: Uint8Array): Promise<Uint8Array> {
		const deflator = new Deflate();
		deflator.push(data, true);

		if(deflator.error) {
			throw deflator.error;
		}
		return deflator.result;
	}

	private static async getInflatedData(dv: DataView, chunks: ChunkInfo[]) {
		const inflator = new Inflate();
		for(const c of chunks) {
			inflator.push(new Uint8Array(dv.buffer, c.pos + 8, c.len));
		}

		if(inflator.error) {
			throw inflator.error;
		}
		return inflator.result;
	}

	private static* getPixels(data: Uint8Array, width: number, height: number) {
		let parsing = true;
		let line = 0;
		let lineLength = (width * 4) + 1;
		let currentFilter = 0;
		while(parsing) {
			let offset = line * lineLength;
			let pixels = [];
			let previousPixel = new Uint8ClampedArray([0, 0, 0, 0]);
			let currentSubPixel = 0;
			for(let c = 0; c < lineLength; c++) {
				if(c === 0) {
					currentFilter = data[c + offset];
					previousPixel = new Uint8ClampedArray([0, 0, 0, 0]);
					currentSubPixel = 0;
				} else {
					if(currentSubPixel > 3) {
						currentSubPixel = 0;
					}
					switch(currentFilter) {
						case 0:
							pixels.push(data[c + offset]);
							break;
						case 1:
							let newSubPixel = (data[c + offset] + previousPixel[currentSubPixel]) % 256;
							pixels.push(newSubPixel);
							previousPixel[currentSubPixel] = newSubPixel;
							break;
					}
					currentSubPixel++;
				}
			}

			yield pixels;

			line++;
			if(line === height) {
				parsing = false;
			}
		}
	}

	private static* getChunks(dv: DataView) {
		let seeking = true;
		// Skip PNG file header.
		let pos: number = 0x08;
		while(seeking) {
			let len = dv.getUint32(pos);
			let typePos = pos + 4;
			let type = 
				String.fromCharCode(dv.getUint8(typePos)) +
				String.fromCharCode(dv.getUint8(typePos + 1)) +
				String.fromCharCode(dv.getUint8(typePos + 2)) +
				String.fromCharCode(dv.getUint8(typePos + 3));

			yield {
				pos,
				len,
				type
			} as ChunkInfo;

			if(type === 'IEND') {
				seeking = false;
			} else {
				pos += len + 12;
			}
		}
	}

	public static async createImageData(
		inputData: number[],
		emoji: string = '',
		backgroundColor: string = '#ffffff'
	) {
		const data = new Uint8Array(inputData);
		const minPx = Math.ceil(data.length);
		const remainder = 3 - data.length % 3;
		const density = Math.floor((IMAGE_SIZE * IMAGE_SIZE) / minPx);
		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d');

		canvas.width = IMAGE_SIZE;
		canvas.height = IMAGE_SIZE;

		ctx.clearRect(0, 0, IMAGE_SIZE, IMAGE_SIZE);

		ctx.fillStyle = `rgba(
				${parseInt(backgroundColor[1] + backgroundColor[2], 16)},
				${parseInt(backgroundColor[3] + backgroundColor[4], 16)},
				${parseInt(backgroundColor[5] + backgroundColor[6], 16)},
				255
			)
		`;
		ctx.fillRect(0, 0, IMAGE_SIZE, IMAGE_SIZE);

		if(emoji) {
			let fontSize = IMAGE_SIZE;
			ctx.font = `${fontSize}px sans-serif`;
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';
			
			let measure = ctx.measureText(emoji);

			if(measure.width > IMAGE_SIZE) {
				fontSize /= measure.width / IMAGE_SIZE;
				ctx.font = `${fontSize}px sans-serif`;
			}

			ctx.fillText(emoji, IMAGE_SIZE / 2, IMAGE_SIZE / 2);
		}

		let img = ctx.getImageData(0, 0, IMAGE_SIZE, IMAGE_SIZE);

		for(let i = 0; i < (data.length + remainder); i++) {
			const imgIdx = (i * density) * 4;
			img.data[imgIdx + 3] = data[i];
		}

		const blob = await ImageUtils
			.create([...img.data], IMAGE_SIZE, IMAGE_SIZE)
			.catch(err => {
				console.log(err);
				return null;
			});

		return await ImageUtils.blobToBase64(blob)
			.catch(err => {
				console.log(err);
				return null;
			});
	}

	private static makeFourCC(n: 'tEXt' | string) {
		const c = n.charCodeAt.bind(n);
		return (c(0) & 0x7f) << 24 | (c(1) & 0x7f) << 16 | (c(2) & 0x7f) << 8 | c(3) & 0x7f
	}

	private static calcCRC(chunk: Uint8Array) {
		let crc = (-1>>>0);
		const len = chunk.length
		for (let i = 0; i < len; i++) {
			crc = (crc >>> 8) ^ ImageUtils.CRC32_Table[(crc ^ chunk[i]) & 0xff];
		} 
		return (crc ^ -1)>>>0;
	}

	private static createCRC32Table() {
		let c;
		const table = [];

		for(let n = 0; n < 256; n++) {
			c = n;
			for (let k = 0; k < 8; k++) {
				c = ((c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
			}
			table[n] = c;
		}

		return table;
	}

	public static base64ToBlob(input: string) {
		let data = Uint8Array.from(atob(input.split('base64,')[1]),	c => c.charCodeAt(0));

		return new Blob([data.buffer], { type: 'image/png' });
	}

	public static base64ToUint8Array(input: string) {
		return Uint8Array.from(atob(input.split('base64,')[1]),	c => c.charCodeAt(0));;
	}

	public static async fileToBase64(file: File): Promise<string> {
		return this.blobToBase64(file);
	}

	public static async blobToBase64(blob: Blob | File): Promise<string> {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = () => resolve(reader.result.toString());
			reader.onerror = error => reject(error);
			reader.readAsDataURL(blob);
		});
	}

	public static async base64ToImageData(input: string) {
		let fileData = this.base64ToBlob(input);

		const i = new Image();
		i.src = URL.createObjectURL(fileData);
		let decodeErr;
		await i.decode()
			.catch(err => {
				decodeErr = err;
			});

		if(decodeErr || !i.width) {
			throw new Error(`Couldn't decode image.`);
		}

		const c = document.createElement('canvas');
		const ctx = c.getContext('2d');
		c.width = i.width;
		c.height = i.height;
		ctx.drawImage(i, 0, 0);

		return ctx.getImageData(0, 0, i.width, i.height);
	}
}