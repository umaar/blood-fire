async function fetcher() {
	return await fetch('Glimp/GlicemiaMisurazioni.csv');
}

export default fetcher;