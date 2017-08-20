import cleanWeirdBits from './clean-weird-bits';

// The server runs on UTC time (0 offset), whereas some clients will have an offset of -60
function isRunningDifferentTimeZoneServer() {
	const time = new Date();
	return time.getTimezoneOffset() === 0;
}

function transformer(_rawLine) {
	const rawLine = _rawLine.map(cleanWeirdBits).filter(entry => !!entry);
	if (!rawLine.length) return;

	const line = cleanWeirdBits(rawLine)
	const parts = line.split(';');
	const timestamp = parts[1].replace(/\./g, ':');

	const [date, month, remaining] = timestamp.split('/')
	const parsedTimestamp = new Date([month, date, remaining].join('/'));

	if (isRunningDifferentTimeZoneServer()) {
		parsedTimestamp.setHours(parsedTimestamp.getHours() - 1);
	}

	const entry = {
		timestamp: parsedTimestamp,
		level: parseInt(parts[5])
	}

	if (entry.level) {
		return entry;
	}
}

export default transformer;