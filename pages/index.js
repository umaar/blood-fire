
import React from 'react'
import LastReading from '../components/last-reading';
import ReadingList from '../components/reading-list';
import Head from 'next/head'
import download from 'download';
import fs from 'fs';
import zlib from 'zlib';
import csv from 'fast-csv';
import transformData from '../modules/blood-line';

const cachedData = [];
async function getAllReadings() {
	// const url = 'https://www.dropbox.com/sh/pprrtnz0v6zt978/AABtu7bXJ4Vk5pxhGnQtIjMXa/GlicemiaMisurazioni.csv.gz?dl=1';
	const url = 'http://127.0.0.1:8080/GlicemiaMisurazioni.csv.gz';

	if (cachedData.length) {
		console.log('Returning cached data');
		console.log(cachedData[0]);

		return cachedData;
	} else {

		console.log('Fetching data');
		const gunzip = zlib.createGunzip();

		var csvStream = csv().on('data', data => {
			const transformedData = transformData(data);

			if (transformedData && transformedData.level) {
				cachedData.push(transformedData);
			}
		});

		function CSVComplete() {
			return new Promise(resolve => {
				csvStream.on('end', () => {
					console.log('CSV Transformation Done');
					resolve(cachedData);
				});
			});
		}

		await download(url)
			.pipe(gunzip)
			.pipe(csvStream);

		return await CSVComplete();
	}
}

function PageWithData({data}) {
	return <div className="container">
		<style jsx>{`
			h4 {
				margin: 50px 0 20px 0;
				text-align: center;
				letter-spacing: 1px;
				font-size: calc(10px + 2vw);
			}

			.readings {
				margin-top: 40px;
				overflow: hidden;
			}

			ul {
				list-style-type: none;
				padding: 0;
			}
		`}</style>

		<LastReading reading={data[0]} />

		<div className="readings">
			<h4 className="readings__label">Past readings</h4>
			<ReadingList readings={data} />
		</div>
	</div>
}

function ErrorPage() {
	return (<p>Sorry, failed getting data</p>);
}

function LandingSection({data = []}) {
	if (data.length) {
		return <PageWithData data={data} />;
	} else {
		return <ErrorPage />;
	}
}

export default class Index extends React.Component {
	static async getInitialProps () {
		try {
			return {
				data: await getAllReadings()
			};
		} catch (err) {
			console.log('Error getting all readings', err);
		}

		return {};
	}

	render () {
		return (
			<div>
				<Head>
					<link href="static/main.css" rel="stylesheet" />
					<link href="https://fonts.googleapis.com/css?family=Luckiest+Guy|Roboto" rel="stylesheet" />
				</Head>

				<LandingSection data={this.props.data} />
			</div>
		);
	}
}