const d3 = require('d3');

const mockData = [...document.querySelectorAll('.readings__list li')].slice(0, 1000).map(el => {
	return {
		date: new Date(el.querySelector('[datetime]').getAttribute('datetime')),
		value: parseFloat(el.querySelector('.readings__list__level').innerText)
	};
}).filter(mockData => !Number.isNaN(mockData.value));

function init() {
	const svg = d3.select('svg');
	const margin = {
		top: 50,
		right: 50,
		bottom: 50,
		left: 50
	};

	const width = Number(svg.attr('width')) - margin.left - margin.right;
	const height = Number(svg.attr('height')) - margin.top - margin.bottom;

	// const parseTime = d3.timeParse('%Y');

	const bisectDate = d3.bisector(d => {
		return d.year;
	}).left;

	const x = d3.scaleTime().range([0, width]);
	const y = d3.scaleLinear().range([height, 0]);

	const line = d3.line().x(d => {
		return x(d.date);
	}).y(d => {
		return y(d.value);
	});

	const g = svg.append('g')
		.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

	mockData.forEach(d => {
		d.value = Number(d.value);
	});

	x.domain(d3.extent(mockData, d => d.date));

	y.domain([
		d3.min(mockData, d => d.value) / 1.005,
		d3.max(mockData, d => d.value) * 1.005
	]);

	g.append('g')
		.attr('class', 'axis axis--x')
		.attr('transform', 'translate(0,' + height + ')')
		.call(d3.axisBottom(x));

	g.append('g')
		.attr('class', 'axis axis--y')
		.call(d3.axisLeft(y).ticks(6).tickFormat(d => d))
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
		.attr('d', line);

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
		}).on('mousemove', () => {});

	function mousemove() {
		const x0 = x.invert(d3.mouse(this)[0]);
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

module.exports = { init };
