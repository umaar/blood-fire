const download = require('download');
const fs = require('fs');
const zlib = require('zlib');
const csv = require('fast-csv');
const transformData = require('./modules/blood-line');

// const url = 'https://www.dropbox.com/sh/pprrtnz0v6zt978/AABtu7bXJ4Vk5pxhGnQtIjMXa/GlicemiaMisurazioni.csv.gz?dl=1';
const url = 'http://127.0.0.1:8080/GlicemiaMisurazioni.csv.gz';

const allData = [];

var csvStream = csv()
	.on('data', data => {
		const transformedData = transformData(data);

		if (transformedData && transformedData.level) {
			console.log('YAY!');
			allData.push(transformedData);
		}
	}).on('end', () => console.log('\n\nDONE', allData));

async function init() {
	console.log;
	const gunzp = zlib.createGunzip();
	const writeStream = fs.createWriteStream('dist/output.csv');

	await download(url)
		.pipe(gunzp)
		// .pipe(writeStream);
		.pipe(csvStream);
}

init();


