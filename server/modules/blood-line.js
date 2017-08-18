const cleanWeirdBits = require('./clean-weird-bits');


function thing(_rawLine) {
	const rawLine = _rawLine.map(cleanWeirdBits).filter(entry => !!entry);
	if (!rawLine.length) return;

	const line = cleanWeirdBits(rawLine)
	const parts = line.split(';');
	const timestamp = parts[1].replace(/\./g, ':');

	const [date, month, remaining] = timestamp.split('/')
	const parsedTimestamp = new Date([month, date, remaining].join('/'))

	const entry = {
		timestamp: parsedTimestamp,
		level: parseInt(parts[5])
	}

	if (entry.level) {
		return entry;
	}
}

module.exports = thing;