/* global fetch, TextDecoder */

import fetchData from './modules/fetch.js';
import parseData from './modules/parse-data.js';
import sortData from './modules/sort-data.js';
import template from './modules/template.js';

function cleanData(data) {
	return data.filter(item => item && item.level && item.timestamp)
}

function getIconForLevel(level) {
	if (level > 300) {
		return '🚨 ☠';
	} else if (level > 200) {
		return '⚠️';
	} else if (level > 100) {
		return '😴';
	}

	return '🙂';
}

function annotateReadings(readings) {
	return readings.map(reading => {
		const {timestamp} = reading;

		const friendlyTime = timestamp.toGMTString().replace('GMT', '').trim();

		return Object.assign({}, reading, {
			friendlyTime: friendlyTime.slice(0, friendlyTime.length - 3),
			icon: getIconForLevel(reading.level)
		})
	})
}

async function init() {
	const response = await fetchData();
	const allData = await parseData(response);
	const sortedData = sortData(allData);
	const [firstItem, ...readings] = cleanData(sortedData);

	const annotatedReadings = annotateReadings(readings);

	const output = Mustache.render(template, {
		lastReading: {
			timestamp: firstItem.timestamp,
			level: firstItem.level,
			icon: getIconForLevel(firstItem.level)
		},
		readings: annotatedReadings
	});

	const container = document.querySelector('.container');
	container.innerHTML = output;
	timeago().render(document.querySelectorAll('[data-timestamp]'), 'en');
}


init();
