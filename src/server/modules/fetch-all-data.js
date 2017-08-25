const zlib = require('zlib');
const download = require('download');
const csv = require('fast-csv');
const config = require('config');

const transformData = require('./blood-line');

module.exports = () => {
	const url = config.get('dataURL');

	console.log(`Fetching new data (${url})`);

	const storage = [];
	const gunzip = zlib.createGunzip();

	return new Promise((resolve, reject) => {
		function handleCSVEntry(data) {
			const transformedData = transformData(data);

			if (transformedData && transformedData.level) {
				storage.push(transformedData);
			}
		}

		function handleCSVFinish() {
			console.log('CSV Transformation Done');
			resolve(storage);
		}

		const csvStream = csv()
			.on('data', handleCSVEntry)
			.on('end', handleCSVFinish);

		const downloadPromise = download(url);
		downloadPromise.catch(reject);
		downloadPromise.pipe(gunzip).pipe(csvStream);
	});
}
