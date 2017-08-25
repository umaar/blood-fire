const d3 = require('d3');

function init() {
	const svg = d3.select('svg');
	const margin = {top: 20, right: 20, bottom: 30, left: 40};
	const width = Number(svg.attr('width')) - margin.left - margin.right;
	const height = Number(svg.attr('height')) - margin.top - margin.bottom;
	const parseTime = d3.timeParse('%Y');
	const bisectDate = d3.bisector(d => {
		return d.year;
	}).left;

	const x = d3.scaleTime().range([0, width]);
	const y = d3.scaleLinear().range([height, 0]);

	const line = d3.line().x(d => {
		return x(d.year);
	}).y(d => {
		return y(d.value);
	});

	const g = svg.append('g')
		.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

	const data = [
		{year: '2005', value: 771900},
		{year: '2006', value: 771500},
		{year: '2007', value: 770500},
		{year: '2008', value: 770400},
		{year: '2009', value: 771000},
		{year: '2010', value: 772400},
		{year: '2011', value: 774100},
		{year: '2012', value: 776700},
		{year: '2013', value: 777100},
		{year: '2014', value: 779200},
		{year: '2015', value: 782300}
	];

	data.forEach(d => {
		d.year = parseTime(d.year);
		d.value = Number(d.value);
	});

	x.domain(d3.extent(data, d => {
		return d.year;
	}));

	y.domain([d3.min(data, d => {
		return d.value;
	}) / 1.005, d3.max(data, d => {
		return d.value;
	}) * 1.005]);

	g.append('g')
		.attr('class', 'axis axis--x')
		.attr('transform', 'translate(0,' + height + ')')
		.call(d3.axisBottom(x));

	g.append('g')
		.attr('class', 'axis axis--y')
		.call(d3.axisLeft(y).ticks(6).tickFormat(d => {
			return parseInt(d / 1000) + 'k';
		}))
		.append('text')
		.attr('class', 'axis-title')
		.attr('transform', 'rotate(-90)')
		.attr('y', 6)
		.attr('dy', '.71em')
		.style('text-anchor', 'end')
		.attr('fill', '#5D6971')
		.text('Population)');

	g.append('path')
		.datum(data)
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
		})
		.on('mouseout', () => {
			focus.style('display', 'none');
		}).on('mousemove', mousemove);

	function mousemove() {
		const x0 = x.invert(d3.mouse(this)[0]);
		const i = bisectDate(data, x0, 1);
		const d0 = data[i - 1];
		const d1 = data[i];
		const d = x0 - d0.year > d1.year - x0 ? d1 : d0;

		focus.attr('transform', 'translate(' + x(d.year) + ',' + y(d.value) + ')');
		focus.select('text').text(() => {
			return d.value;
		});

		focus.select('.x-hover-line').attr('y2', height - y(d.value));
		focus.select('.y-hover-line').attr('x2', width + width);
	}
}

module.exports = {
	init
};
