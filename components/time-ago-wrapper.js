import TimeAgo from 'timeago-react';

export default (props) => {
	return <span className="time">
		<TimeAgo datetime={props.time} locale='en' />
	</span>
};