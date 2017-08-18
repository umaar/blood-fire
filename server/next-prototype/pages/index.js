
import React from 'react'
import LastReading from '../components/last-reading'
import Head from 'next/head'

//////////////

import download from 'download';
import fs from 'fs';
import zlib from 'zlib';
import csv from 'fast-csv';
import transformData from '../modules/blood-line';

// const url = 'https://www.dropbox.com/sh/pprrtnz0v6zt978/AABtu7bXJ4Vk5pxhGnQtIjMXa/GlicemiaMisurazioni.csv.gz?dl=1';
const url = 'http://127.0.0.1:8080/GlicemiaMisurazioni.csv.gz';
const allData = [];

export default class MyPage extends React.Component {
	static async getInitialProps () {
		if (!allData.length) {
			const gunzip = zlib.createGunzip();

			var csvStream = csv()
				.on('data', data => {
					const transformedData = transformData(data);

					if (transformedData && transformedData.level) {
						allData.push(transformedData);
					}
				}).on('end', () => console.log('\n\nDONE'));

			await download(url)
				.pipe(gunzip)
				.pipe(csvStream);
		} else {
			console.log('We already have the data!');
			console.log(allData[0]);
		}

		return {
			data: allData
		};
	}

	render () {
		const {data} = this.props;
		return (
			<div>
				<Head>
					<link href="static/main.css" rel="stylesheet" />
					<link href="https://fonts.googleapis.com/css?family=Luckiest+Guy|Roboto" rel="stylesheet" />
				</Head>
				<div className="container">
					<LastReading reading={data[0]} />
				</div>
			</div>
		)
	}
}