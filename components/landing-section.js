import PageWithData from './page-with-data';
import ErrorPage from './error-page';

export default function LandingSection(props) {
	const {data = []} = props;

	if (data.length) {
		return <PageWithData data={data} />;
	} else {
		return <ErrorPage />;
	}
}
