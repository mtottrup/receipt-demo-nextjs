import React from 'react';
import { CSVLink } from 'react-csv';
import { markExported } from '../../api/firebaseFirestore';

export default function CSVDownload({ headers, data }) {
	const currentDate = new Date();

	return (
		<CSVLink
			data={data}
			headers={headers}
			onClick={() => markExported(data)}
			fileName={`exported_receipts_${currentDate}`}>
			CSV Download
		</CSVLink>
	);
}
