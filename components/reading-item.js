import TimeAgo from 'timeago-react';
import Icon from '../components/icon'
import ReadingItemStyles from './reading-item-styles';

export default ({reading}) => (
	<li>
		<style jsx>{ReadingItemStyles}</style>

		<span className="icon">
			<Icon level={reading.level} />
		</span>

		<p className="level">{reading.level}</p>
		<p className="exact-timestamp">{reading.friendlyTime}</p>

		<span className="timestamp">
			<TimeAgo datetime={reading.timestamp} locale='en' />
		</span>

	</li>
);