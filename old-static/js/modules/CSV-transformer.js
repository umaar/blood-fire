class CSVTransformer {
	constructor({customTransformer} = {}) {
		if (typeof customTransformer === 'function') {
			this.customTransformer = customTransformer;
		}
	}

	start() {
		this.pending = [];
		this.decoder = new TextDecoder();
	}

	transform(chunk, controller) {
		let result = this.decoder.decode(chunk);

		if (this.pending.length > 0) {
			result = this.pending[0] + result;
			this.pending = [];
		}

		const lines = result.split('\n');
		const characters = result.split('');
		const isEndingIncomplete = characters[characters.length - 1] !== '\n';

		if (isEndingIncomplete) {
			this.pending.push(lines.pop());
		}

		lines.forEach(line => {
			if (this.customTransformer) {
				const transformedResult = this.customTransformer(line)

				if (transformedResult) {
					controller.enqueue(transformedResult);
				}
			} else {
				controller.enqueue(line);
			}
		});
	}
}

export default CSVTransformer;
