
import React from 'react'
import Head from 'next/head'

import fetchAllData from '../modules/fetch-all-data';
import LandingSection from '../components/landing-section';

let cachedData = [];

async function getAllReadings() {
	if (cachedData.length) {
		console.log('Returning cached data. Example: ', cachedData[0]);
		return cachedData;
	} else {
		console.log('Fetching new data');
		try {
			cachedData = await fetchAllData();
			return cachedData;
		} catch (err) {
			throw new Error(err);
		}
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