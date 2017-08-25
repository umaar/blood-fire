const cleanWeirdBits = require('./clean-weird-bits');

// The server runs on UTC time (0 offset), whereas some clients will have an offset of -60
function isRunningDifferentTimeZoneServer() {
	const time = new Date();
	return time.getTimezoneOffset() === 0;
}

function calculateLevel(level) {
	return parseFloat((parseInt(level, 10) / 18)).toFixed(1);
}


function getLevelDetails(level) {
	if (level >= 8.5) {
		return {
			description: 'hyperglycemic',
			icon: '🏥🤒'
		};
	} else if (level >= 7.5) {
		return {
			description: 'slightly hyperglycemic',
			icon: '☹️'
		};
	} else if (level >= 6) {
		return {
			description: 'golden',
			icon: '🤗'
		};
	} else if (level >= 5) {
		return {
			description: 'a tad low, might feel a bit funny',
			icon: '😴'
		};
	} else if (level >= 2) {
		return {
			description: 'hypoglycemic',
			icon: '😫'
		};
	} else if (level >= 1) {
		return {
			description: 'hypoglycemic, possibly conscious',
			icon: '😷'
		};
	}

	return {
		description: 'dead or unconscious',
		icon: '☠'
	};
}

function transformer(_rawLine) {
	const rawLine = _rawLine.map(cleanWeirdBits).filter(entry => Boolean(entry));

	if (rawLine.length === 0) {
		return;
	}

	const line = cleanWeirdBits(rawLine);
	const parts = line.split(';');
	const timestamp = parts[1].replace(/\./g, ':');

	const [date, month, remaining] = timestamp.split('/');
	const parsedTimestamp = new Date([month, date, remaining].join('/'));

	if (isRunningDifferentTimeZoneServer()) {
		parsedTimestamp.setHours(parsedTimestamp.getHours() - 1);
	}

	const level = calculateLevel(parts[5]);
	const {icon, description: levelDescription} = getLevelDetails(level);

	const entry = {
		timestamp: parsedTimestamp,
		truncatedTimestamp: parsedTimestamp.toString().split(' ').slice(0, 5).join(' '),
		icon,
		levelDescription,
		level
	};

	if (entry.level) {
		return entry;
	}
}

module.exports = transformer;
