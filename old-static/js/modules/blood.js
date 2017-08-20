import cleanWeirdBits from './clean-weird-bits.js';

function thing(line) {

	const parts = line.split(';');
	const timestamp = cleanWeirdBits(parts[1]).replace(/\./g, ':');

	const [date, month, remaining] = timestamp.split('/')
	const parsedTimestamp = new Date([month, date, remaining].join('/'))

	const entry = {
		timestamp: parsedTimestamp,
		level: parseInt(cleanWeirdBits(parts[5]))
	}

	if (entry.level) {
		return entry;
	}
}

export default thing;