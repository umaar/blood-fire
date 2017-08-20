import ReadingList from './reading-list';
import LastReading from './last-reading';

export default function PageWithData({data}) {

	return <div className="container">
		<style jsx>{`
			h4 {
				margin: 50px 0 20px 0;
				text-align: center;
				letter-spacing: 1px;
				font-size: calc(10px + 2vw);
			}

			.readings {
				margin-top: 40px;
				overflow: hidden;
			}

			ul {
				list-style-type: none;
				padding: 0;
			}
		`}</style>

		<LastReading reading={data[0]} />

		<div className="readings">
			<h4 className="readings__label">Past readings</h4>
			<ReadingList readings={data} />
		</div>
	</div>
}