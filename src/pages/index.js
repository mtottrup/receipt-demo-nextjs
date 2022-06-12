import { useState, useEffect } from 'react';
import firebaseConfig from '../api/firebase';
import Nav from '../components/nav-bar/Nav';
import Login from '../components/login/Login';
import { FingerPrintIcon } from '@heroicons/react/outline';
import { onDocumentsChange } from '../api/firebaseFirestore';
import { DocumentContext } from '../context/DocumentContext';
import DocumentList from '../components/document-list/DocumentList';
import DocumentPreview from '../components/document-preview/DocumentPreview';
import DocumentData from '../components/document-data/DocumentData';
import DataGridView from '../components/grid-view/DataGridView';

export default function Home() {
	const [documents, setDocuments] = useState([]);
	const [filteredDocuments, setFilteredDocuments] = useState([]);
	const [activeDocument, setActiveDocument] = useState(null);
	const [fileDetails, setFileDetails] = useState([]);
	const [gridView, setGridView] = useState(false);

	useEffect(() => {
		const documentsSnapUnsubscribe = onDocumentsChange(data => {
			setDocuments(data);
			setFilteredDocuments(data);
		}, 'documents');
		const fileDetailsSnapUnsubscribe = onDocumentsChange(data => {
			setFileDetails(data);
		}, 'fileDetails');

		if (!activeDocument) {
			setActiveDocument(filteredDocuments[0]);
		}

		return () => {
			documentsSnapUnsubscribe();
			fileDetailsSnapUnsubscribe();
		};
	}, []);

	useEffect(() => {
		if (filteredDocuments.filter(e => e.id === activeDocument?.id).length < 1) {
			setActiveDocument(filteredDocuments[0]);
		}
	}, [filteredDocuments, activeDocument]);

	console.log('Documents', documents);
	console.log('File Details', fileDetails);
	return (
		<DocumentContext.Provider
			value={{
				documents,
				filteredDocuments,
				setFilteredDocuments,
				activeDocument,
				setActiveDocument,
				fileDetails,
				setFileDetails,
				gridView,
				setGridView,
			}}>
			<Nav />
			{gridView ? (
				<DataGridView />
			) : (
				<div className='flex flex-row h-[calc(100vh_-_62px)] divide-x'>
					<DocumentList />
					<DocumentPreview />
					<DocumentData />
				</div>
			)}
		</DocumentContext.Provider>
	);
}
