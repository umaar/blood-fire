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
		title: 'Blood fire',
		lastReading: readings[0],
		allReadings: readings.slice(1)
	};

	res.render('index', renderObject);
});

module.exports = router;
