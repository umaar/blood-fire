import ReadingItem from './reading-item';

export default ({readings}) => (
	<ul>
		{readings.slice(1).map((reading, index) =>
			<ReadingItem key={index} reading={reading} />
		)}
	</ul>
);