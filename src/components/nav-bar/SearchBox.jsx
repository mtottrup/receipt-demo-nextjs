import { useState, useContext, useEffect } from 'react';
import { DocumentContext } from '../../context/DocumentContext';

export default function SearchBox() {
	const [query, setQuery] = useState('');
	const { documents, setFilteredDocuments } = useContext(DocumentContext);

	useEffect(() => {
		if (query === '') {
			setFilteredDocuments(documents);
		} else {
			const filterDocs = async () => {
				const docs = await search(documents, query);
				setFilteredDocuments(docs);
			};
			filterDocs();
		}
	}, [documents]);

	useEffect(() => {
		setFilteredDocuments(search(documents, query));
	}, [query]);

	function search(docs, q) {
		if (q === '') {
			return docs;
		} else {
			return docs.filter(document => {
				return (
					document.name?.toLowerCase().indexOf(q.toLowerCase()) > -1 ||
					document.ocr?.toLowerCase().indexOf(q.toLowerCase()) > -1 ||
					document.total?.toString().toLowerCase().indexOf(q.toLowerCase()) > -1 ||
					new Date(document.date?.seconds * 1000)
						.toLocaleDateString('en-US')
						.toLowerCase()
						.indexOf(q.toLowerCase()) > -1
				);
			});
		}
	}

	return (
		<div className='flex flex-col rounded'>
			<input
				type='text'
				className='h-8 px-2 rounded'
				value={query}
				onChange={e => setQuery(e.target.value)}
			/>
		</div>
	);
}
