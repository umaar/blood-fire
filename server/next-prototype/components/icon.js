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

export default ({level}) => (
	<span>
		{getIconForLevel(level)}
	</span>
);