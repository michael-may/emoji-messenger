const fs = require('fs');

class Emoji {
	primary: string;
	variants: string[]
}

class EmojiParser {
	private filePath = './imports/emoji-test.txt';

	private emojiData: string[];
	private emojis: Record<string, Array<String | Emoji>> = {};

	private currentGroup: string;

	private pendingEmoji: Emoji;
	private previousVariant: string = '';
	private currentVariant: string = '';

	constructor(path?: string) {
		if(path) {
			this.filePath = path;
		}
		this.init();
	}

	private init() {
		this.loadFile(this.filePath);
		for(const l of this.emojiData) {
			this.parseLine(l);
		}
		const outFile = `
// This file was auto-generated by emoji-parser.ts
class Emoji {
	primary: string;
	variants: string[]
}
export class EmojiList {
	name: string;
	emojis: Array<String | Emoji>;
}
export const Emojis: EmojiList[] = ${this.exportCategories()};
		`;

		if(!fs.existsSync('./exports')) {
			fs.mkdirSync('./exports');
		}

		fs.writeFileSync(`./exports/emoji-export.${Date.now()}.ts`, outFile, 'utf-8');
	}

	private loadFile(path: string) {
		const file = fs.readFileSync(path, 'utf-8');

		if(!file) {
			console.error(`Couldn't load file.`);
			process.exitCode = 1;
			return;
		} else {
			this.emojiData = file.split('\n');
		}
	}

	private parseLine(line: string) {
		line = line.trim();
		if(!line.length) {
			return;
		}
		if(line.match(/^#/)) {
			if(line.includes('# group:')) {
				let group = line.split(':')[1].trim();

				if(group === 'Component') {
					return;
				}

				if(this.pendingEmoji) {
					this.emojis[this.currentGroup].push(this.pendingEmoji);
					this.pendingEmoji = null;
				}

				this.currentGroup = group;
				this.emojis[group] = [];
				
				console.log(`Starting group: ${group}`);
				return;
			}
			if(line.includes('# subgroup:')) {
				// TODO
			}
			if(line.includes('# EOF')) {
				if(this.pendingEmoji) {
					this.emojis[this.currentGroup].push(this.pendingEmoji);
				}
				return;
			}
			return;
		}
		const components = line.split(';').map(c => c.trim());

		if(components[1].includes('unqualified')) {
			return;
		}

		let variantGroup = components[1].replace(/^.*?#/, '').trim().split(/E[0-9]{1,2}\.[0-9]{1,2}/)[1].trim();
		const codePoints = components[0].split(' ').map(c => parseInt(c, 16));
		const emoji = String.fromCodePoint(...codePoints);

		if(!variantGroup.match(/^flag:|^keycap:/)) {
			variantGroup = variantGroup.split(':')[0].trim()
		}

		this.previousVariant = this.currentVariant;
		this.currentVariant = variantGroup;

		if(this.previousVariant !== this.currentVariant) {
			if(this.pendingEmoji) {
				this.emojis[this.currentGroup].push(this.pendingEmoji);
			}
			this.pendingEmoji = {
				primary: emoji,
				variants: []
			};
		}

		this.pendingEmoji.variants.push(emoji);
	}

	private exportCategories() {
		let categories = [];
		for(const [k,v] of Object.entries(this.emojis)) {
			categories.push({
				name: k,
				emojis: v.map((e: Emoji) => {
					if(!e.variants || e.variants.length === 1) {
						return e.primary;
					} else {
						e.variants = e.variants.slice(1)
					}
					return e;
				})
			});
		}
		return JSON.stringify(categories, null, 4).replace(/    /g, '\t').replace(/"/g, `'`);
	}
}

let path;
const arg = process.argv[2];
if(arg && fs.existsSync(arg)) {
	path = arg;
}

new EmojiParser(path);