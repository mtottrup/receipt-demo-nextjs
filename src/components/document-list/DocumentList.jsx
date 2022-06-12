import { map } from '@firebase/util';
import { useContext } from 'react';
import { DocumentContext } from '../../context/DocumentContext';
import DocumentListItem from './DocumentListItem';

export default function DocumentList() {
	const { filteredDocuments } = useContext(DocumentContext);
	return (
		<div className='w-3/12 pt-2 overflow-auto divide-y'>
			{filteredDocuments?.map((document, index) => (
				<DocumentListItem key={document.id} document={document} index={index} />
			))}
		</div>
	);
}
