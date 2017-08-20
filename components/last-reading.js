
import Icon from '../components/icon'
import TimeAgo from 'timeago-react';

export default ({reading}) => (
	<div className="root">
		<style jsx>{`
			.root {
				text-align: center;
				font-family: 'Luckiest Guy', cursive;
				margin-bottom: 90px;
			}

			p {
				margin: 10px;
			}

			.time {
				font-size: calc(30px + 4vw);
			}

			.level {
				font-size: calc(40px + 13vw);
			}
		`}</style>

		<p className="level">
			{reading.level}
			<Icon level={reading.level} />
		</p>

		<span className="time">
			<TimeAgo datetime={reading.timestamp} locale='en' />
		</span>
	</div>
);

