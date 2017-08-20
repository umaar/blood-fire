import TimeAgo from 'timeago-react';
import Icon from '../components/icon'

export default ({reading}) => (
	<li>
		<style jsx>{`
			p {
				margin: 0;
			}

			li {
				margin-top: 20px;
				padding: 10px;
				display: flex;
				justify-content: center;
				align-items: center;
			}

			.exact-timestamp {
				padding-left: 10px;
				padding-right: 10px;
			}

			.level {
			    font-family: 'Luckiest Guy', cursive;
			    font-size: 24px;
			    padding-right: 20px;
			    margin-top: 7px;
			    letter-spacing: 1px;
			}

			.icon {
				margin-right: 20px;
			}

			.timestamp {
				font-style: italic;
				color: #ccc;
				font-size: 14px;
			}
		`}</style>

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