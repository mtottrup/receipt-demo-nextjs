import { useContext } from 'react';
import DataGrid from 'react-data-grid';
import { DocumentContext } from '../../context/DocumentContext';
import CSVDownload from './CSVDownload';

export default function DataGridView() {
	const { documents } = useContext(DocumentContext);

	const columns = [
		{ key: 'date', name: 'Date', label: 'Date' },
		{ key: 'documentType', name: 'Doc Type', label: 'Doc Type' },
		{ key: 'name', name: 'Name', label: 'Name' },
		{ key: 'ref', name: 'Ref', label: 'Ref' },
		{ key: 'total', name: 'Total', label: 'Total' },
		{ key: 'ocr', name: 'OCR', label: 'OCR' },
	];

	const rows = documents
		.map((el, index) => {
			if (el.reviewed && !el.exported) {
				return {
					id: index,
					docId: el.id,
					date: el.date ? el.date.toDate().toLocaleString() : '',
					documentType: el.documentType,
					name: el.name,
					ref: el.ref,
					total: el.total,
					ocr: `${el.ocr.replaceAll('"', ' ')}`,
				};
			}
		})
		.filter(a => a);

	return (
		<div className='mx-8 my-3'>
			<div className='w-32 px-2 mb-4 text-white bg-indigo-600 reounded-sm'>
				<CSVDownload headers={columns} data={rows} enclosingCharacter={'`'}></CSVDownload>
			</div>
			<DataGrid columns={columns} rows={rows} className='rdg-light' />
		</div>
	);
}
