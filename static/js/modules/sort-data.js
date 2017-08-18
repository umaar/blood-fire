function sortData(data) {
	const [first, ...sortedItems] = data.sort(function({timestamp1}, {timestamp2}) {
		if (timestamp1 < timestamp2) {
			return -1;
		}

		if (timestamp1 > timestamp2) {
			return 1;
		}

		return 0;
	});

	return sortedItems;
}

export default sortData;