import Icon from '../components/icon'
import TimeAgoWrapper from './time-ago-wrapper';
import lastReadingStyles from './last-reading-styles';

export default ({reading}) => {
	console.log('###');
	console.log(reading.timestamp);

	return (
		<div className="root">
			<style jsx>{lastReadingStyles}</style>

			<p className="level">
				{reading.level}
				<Icon level={reading.level} />
			</p>

			<TimeAgoWrapper time={reading.timestamp} />
		</div>)
};

