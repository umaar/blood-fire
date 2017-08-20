
import Icon from '../components/icon'
import TimeAgo from 'timeago-react';
import lastReadingStyles from './last-reading-styles';

export default ({reading}) => (
	<div className="root">
		<style jsx>{lastReadingStyles}</style>

		<p className="level">
			{reading.level}
			<Icon level={reading.level} />
		</p>

		<span className="time">
			<TimeAgo datetime={reading.timestamp} locale='en' />
		</span>
	</div>
);

