import { useContext, useState } from 'react';
import Image from 'next/image';
import { DocumentContext } from '../../context/DocumentContext';
import { Document, Page, pdfjs } from 'react-pdf';
import Loading from './Loading';
import { FilterIcon } from '@heroicons/react/solid';

export default function DocumentPreview() {
	pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

	const [numPages, setNumPages] = useState(null);
	const charsBeforeStorageFileName = 6;

	function onDocumentLoadSuccess({ numPages }) {
		setNumPages(numPages);
	}

	const { activeDocument, fileDetails } = useContext(DocumentContext);

	const fileUuid = activeDocument?.storageFileName.substring(charsBeforeStorageFileName);

	const fileUrl = fileDetails?.filter(d => d.id == fileUuid)[0]?.url;
	console.log('active Document', activeDocument);

	return (
		<div className='w-1/2 overflow-auto'>
			{activeDocument && activeDocument?.fileType == 'application/pdf' ? (
				<div className='flex justify-center'>
					<Document
						className='self-center'
						loading={<Loading />}
						file={{
							url: fileUrl,
						}}
						onLoadSuccess={onDocumentLoadSuccess}>
						{Array.apply(null, Array(numPages))
							.map((x, i) => i + 1)
							.map((page, index) => (
								<Page pageNumber={page} key={index} />
							))}
					</Document>
				</div>
			) : (
				<>
					{activeDocument &&
					(activeDocument?.fileType === 'image/jpeg' ||
						activeDocument?.fileType === 'image/png') ? (
						fileUrl != undefined ? (
							fileUrl.length > 0 ? (
								// eslint-disable-next-line jsx-a11y/alt-text
								<Image
									placeholder={<Loading />}
									src={fileUrl}
									width='100%'
									height='100%'
									layout='responsive'
									objectFit='contain'
									priority='true'
								/>
							) : (
								<div>No Image</div>
							)
						) : (
							<div>No Image</div>
						)
					) : (
						<div>No Document Selected</div>
					)}
				</>
			)}
		</div>
	);
}
