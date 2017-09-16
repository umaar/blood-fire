const express = require('express');
const fetchAllData = require('../modules/fetch-all-data');

/* eslint-disable new-cap */
const router = express.Router();
/* eslint-enable new-cap */

let cachedData = [];
let lastRetrievedTime;

function dataIsStale() {
	const maxAgeForData = 1000 * 60 * 10; // Ten Minutes
	const timeSinceUpdate = Number(new Date()) - lastRetrievedTime;
	const isStale = timeSinceUpdate > maxAgeForData;

	console.log(`Data is ${isStale ? 'stale ☠' : 'fresh 🍎'} (${timeSinceUpdate}ms)`);
	return isStale;
}

async function getAllReadings() {
	if (cachedData.length > 0 && !dataIsStale()) {
		console.log('Returning cached data. Example: ', cachedData[0]);
		return cachedData;
	} else {
		try {
			cachedData = await fetchAllData();
			lastRetrievedTime = Number(new Date());
			return cachedData;
		} catch (err) {
			throw new Error(err);
		}
	}
}

getAllReadings().catch(err => {
	console.log('Failed to populate data on app start. Error: ', err);
});

router.get('/', async (req, res) => {
	const readings = await getAllReadings();

	const renderObject = {
		lastReading: readings[0],
		allReadings: readings.slice(1)
	};

	res.render('index', renderObject);
});

router.get('/api', async (req, res) => {
	const readings = await getAllReadings();

	const last24Hours = new Date();
	last24Hours.setDate(last24Hours.getDate() - 1);

	const renderObject = {
		title: 'API Access',
		last24Hours: +last24Hours
	};

	res.render('api', renderObject);
});

router.get('/api/readings', async (req, res) => {
	let {query: {from = 0}} = req;

	from = isNaN(parseInt(from)) ? 0 : parseInt(from);

	const readings = (await getAllReadings()).filter(({timestamp}) => {
		return new Date(timestamp) > new Date(from);
	});

	res.json({
		readings
	});
});

module.exports = router;
