export default function cleanWeirdBits(str) {
	return decodeURIComponent(encodeURIComponent(str))
		.replace(/[\x00-\x1F\x7F-\x9F]/g, "");
}