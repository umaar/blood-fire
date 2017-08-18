
import {TransformStream} from '../vendor/transform-stream.js';
import CSVTransformer from './CSV-transformer.js';
import bloodDataTransform from './blood.js';

async function parseData(response) {
	const customTransformer = new CSVTransformer({
		customTransformer: bloodDataTransform
	});

	const transformer = new TransformStream(customTransformer);

	const stream = response.body.pipeThrough(transformer);
	const reader = stream.getReader();

	const allResults = [];

	while (true) {
		const {value, done} = await reader.read();
		allResults.push(value);

		if (done) {
			break;
		}
	}

	return allResults;
}

export default parseData;