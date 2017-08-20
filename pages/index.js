
import React from 'react'
import Head from 'next/head'

import fetchAllData from '../modules/fetch-all-data';
import LandingSection from '../components/landing-section';

const isDevelopment = process.env.NODE_ENV !== 'production'

console.log(`[App Running] (${isDevelopment ? 'development' : 'production'})`);

let cachedData = [];
let lastRetrievedTime;

function dataIsStale() {
	const maxAgeForData = 1000 * 60 * 10; // Ten Minutes
	const timeSinceUpdate = +(new Date()) - lastRetrievedTime;
	const isStale = timeSinceUpdate > maxAgeForData;
	console.log(`Data is ${isStale ? 'stale ☠' : 'fresh 🍎'} (${timeSinceUpdate}ms)`);
	return isStale;
}

async function getAllReadings() {
	if (cachedData.length && !dataIsStale()) {
		console.log('Returning cached data. Example: ', cachedData[0]);
		return cachedData;
	} else {
		try {
			cachedData = await fetchAllData({
				isDevelopment
			});

			lastRetrievedTime = +(new Date());

			return cachedData;
		} catch (err) {
			throw new Error(err);
		}
	}
}

// Populate with data on app start
getAllReadings().catch(err => {
	console.log('Failed to populate data on app start. Error: ', err);
});

export default class Index extends React.Component {
	static async getInitialProps () {
		try {
			return {
				data: await getAllReadings()
			};
		} catch (err) {
			console.log('Error getting all readings', err);
			return {};
		}
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