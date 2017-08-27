/* global window, document */

import {
	select,
	bisector,
	scaleTime,
	scaleLinear,
	line,
	extent,
	axisBottom,
	axisLeft,
	min,
	max,
	mouse
} from 'd3';

function getReadings() {
	const data = [...document.querySelectorAll('.readings__list li')].map(el => {
		return {
			date: new Date(el.querySelector('[datetime]').getAttribute('datetime')),
			value: parseFloat(el.querySelector('.readings__list_level-figure').innerText)
		};
	}).filter(data => !Number.isNaN(data.value)).sort((a, b) => {
		const nameA = a.date;
		const nameB = b.date;

		if (nameA < nameB) {
			return -1;
		}

		if (nameA > nameB) {
			return 1;
		}

		return 0;
	});

	return data;
}

function getPreferredChartWidth() {
	const containerStyles = window.getComputedStyle(document.querySelector('.container'));
	return Math.min(parseInt(containerStyles.width, 10), 1000);
}

function initialiseChart() {
	document.querySelector('svg').setAttribute('width', getPreferredChartWidth());
	setupChartControls();
}

function setupChartControls() {
	const timeKeys = {
		'past-24-hours'() {
			const date = new Date();
			date.setDate(date.getDate() - 1);
			return date;
		},
		'past-3-days'() {
			const date = new Date();
			date.setDate(date.getDate() - 3);
			return date;
		},
		'past-week'() {
			const date = new Date();
			date.setDate(date.getDate() - 7);
			return date;
		},
		'past-month'() {
			const date = new Date();
			date.setMonth(date.getMonth() - 1);
			return date;
		},
		'all-time'() {
			return 0;
		}
	};

	const controlsContainer = document.querySelector('.visualisation__controls');
	const buttons = [...controlsContainer.querySelectorAll('[data-time-key]')];

	buttons.forEach(button => {
		button.addEventListener('click', ({target}) => {
			removeDisabledStateFromButtons(buttons);
			target.disabled = true;
			const selectedStartTime = timeKeys[target.dataset.timeKey]();

			const allData = getReadings();

			const matchingReadings = allData.filter(reading => {
				return reading.date > selectedStartTime;
			});

			createChart(matchingReadings);
		});
	});
}

function removeDisabledStateFromButtons(buttons) {
	buttons.forEach(button => {
		button.disabled = false;
	});
}

function createChart(data) {
	const svg = select('svg');
	svg.selectAll('*').remove();

	const margin = {
		top: 50,
		right: 50,
		bottom: 50,
		left: 50
	};

	const width = Number(svg.attr('width')) - margin.left - margin.right;
	const height = Number(svg.attr('height')) - margin.top - margin.bottom;

	const bisectDate = bisector(d => d.date).left;

	const x = scaleTime().range([0, width]);
	const y = scaleLinear().range([height, 0]);

	const lines = line()
		.x(d => x(d.date))
		.y(d => y(d.value));

	const g = svg.append('g')
		.attr('transform', `translate(${margin.left}, ${margin.top})`);

	data.forEach(d => {
		d.value = Number(d.value);
	});

	x.domain(extent(data, d => d.date));

	y.domain([
		min(data, d => d.value) / 1.005,
		max(data, d => d.value) * 1.005
	]);

	g.append('g')
		.attr('class', 'axis axis--x')
		.attr('transform', 'translate(0,' + height + ')')
		.call(axisBottom(x));

	g.append('g')
		.attr('class', 'axis axis--y')
		.call(axisLeft(y).ticks(6).tickFormat(d => d))
		.append('text')
		.attr('class', 'axis-title')
		.attr('transform', 'rotate(-90)')
		.attr('y', 6)
		.attr('dy', '.71em')
		.style('text-anchor', 'end')
		.attr('fill', '#5D6971')
		.text('(mmol/L)');

	g.append('path')
		.datum(data)
		.attr('class', 'line')
		.attr('d', lines);

	const focus = g.append('g')
		.attr('class', 'focus')
		.style('display', 'none');

	focus.append('line')
		.attr('class', 'x-hover-line hover-line')
		.attr('y1', 0)
		.attr('y2', height);

	focus.append('line')
		.attr('class', 'y-hover-line hover-line')
		.attr('x1', width)
		.attr('x2', width);

	focus.append('circle')
		.attr('r', 7.5);

	focus.append('text')
		.attr('x', 15)
		.attr('dy', '.31em');

	svg.append('rect')
		.attr('transform', `translate(${margin.left}, ${margin.top})`)
		.attr('class', 'overlay')
		.attr('width', width)
		.attr('height', height)
		.on('mouseover', () => {
			focus.style('display', null);
		}).on('mouseout', () => {
			focus.style('display', 'none');
		}).on('mousemove', mousemove);

	function mousemove() {
		const x0 = x.invert(mouse(this)[0]);
		const i = bisectDate(data, x0, 1);
		const d0 = data[i - 1];
		const d1 = data[i];

		const d = x0 - d0.date > d1.date - x0 ? d1 : d0;

		focus.attr('transform', 'translate(' + x(d.date) + ',' + y(d.value) + ')');
		focus.select('text').text(() => {
			return d.value;
		});

		focus.select('.x-hover-line').attr('y2', height - y(d.value));
		focus.select('.y-hover-line').attr('x2', width + width);
	}
}

function init() {
	initialiseChart();
	document.querySelector('[data-time-key="past-week"]').click();
}

export default {init};
