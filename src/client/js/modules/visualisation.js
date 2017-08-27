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

function init() {
	const mockData = [...document.querySelectorAll('.readings__list li')].map(el => {
		return {
			date: new Date(el.querySelector('[datetime]').getAttribute('datetime')),
			value: parseFloat(el.querySelector('.readings__list_level-figure').innerText)
		};
	}).filter(mockData => !Number.isNaN(mockData.value)).sort((a, b) => {
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

	const containerStyles = window.getComputedStyle(document.querySelector('.container'));
	const desiredWidth = Math.min(parseInt(containerStyles.width, 10), 1000);

	document.querySelector('svg').setAttribute('width', desiredWidth);

	const svg = select('svg');
	const margin = {
		top: 50,
		right: 50,
		bottom: 50,
		left: 50
	};

	const width = Number(svg.attr('width')) - margin.left - margin.right;
	const height = Number(svg.attr('height')) - margin.top - margin.bottom;

	const bisectDate = bisector(d => {
		return d.date;
	}).left;

	const x = scaleTime().range([0, width]);
	const y = scaleLinear().range([height, 0]);

	const lines = line()
		.x(d => x(d.date))
		.y(d => y(d.value));

	const g = svg.append('g')
		.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

	mockData.forEach(d => {
		d.value = Number(d.value);
	});

	x.domain(extent(mockData, d => d.date));

	y.domain([
		min(mockData, d => d.value) / 1.005,
		max(mockData, d => d.value) * 1.005
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
		.datum(mockData)
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
		.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
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
		const i = bisectDate(mockData, x0, 1);
		const d0 = mockData[i - 1];
		const d1 = mockData[i];

		const d = x0 - d0.date > d1.date - x0 ? d1 : d0;

		focus.attr('transform', 'translate(' + x(d.date) + ',' + y(d.value) + ')');
		focus.select('text').text(() => {
			return d.value;
		});

		focus.select('.x-hover-line').attr('y2', height - y(d.value));
		focus.select('.y-hover-line').attr('x2', width + width);
	}
}

export default {init};
