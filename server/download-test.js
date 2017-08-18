const download = require('download');
const fs = require('fs');
const zlib = require('zlib');
const csv = require('fast-csv');

// const url = 'https://www.dropbox.com/sh/pprrtnz0v6zt978/AABtu7bXJ4Vk5pxhGnQtIjMXa/GlicemiaMisurazioni.csv.gz?dl=1';
const url = 'http://127.0.0.1:8080/GlicemiaMisurazioni.csv.gz';

const allData = [];

var csvStream = csv({headers: false})
    .on('data', function(data){
		console.log(data);
    })
    .on('end', function(){
		console.log('\n\nDONE');
    });

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


