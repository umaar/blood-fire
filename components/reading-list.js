import ReadingItem from './reading-item';

export default ({readings}) => (
	<ul>
		{readings.map((reading, index) =>
			<ReadingItem key={index} reading={reading} />
		)}
	</ul>
);