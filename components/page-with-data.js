import ReadingList from './reading-list';
import LastReading from './last-reading';
import PageWithDataStyles from './page-with-data-styles';

export default function PageWithData({data}) {
	return <div className="container">
		<style jsx>{PageWithDataStyles}</style>

		<LastReading reading={data[0]} />

		<div className="readings">
			<h4 className="readings__label">Past readings</h4>
			<ReadingList readings={data} />
		</div>
	</div>
}