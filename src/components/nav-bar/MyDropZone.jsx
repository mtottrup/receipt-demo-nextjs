import { useCallback, useState, useContext } from 'react';
import { useDropzone } from 'react-dropzone';
import { uploadFile } from '../../api/firebaseStorage';
import { DocumentContext } from '../../context/DocumentContext';

export default function MyDropzone() {
	const [progress, setProgress] = useState(0);
	const { fileDetails } = useContext(DocumentContext);

	const onDrop = useCallback(acceptedFiles => {
		const file = acceptedFiles?.[0];
		if (!file) {
			return;
		}

		uploadFile(file, setProgress, fileDetails);
	}, []);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

	return (
		<div {...getRootProps()}>
			<input {...getInputProps()} />
			<div className='flex flex-col items-center p-20 mx-5 border-4 border-dashed rounded-sm h-5/6'>
				<div className='flex flex-col h-200 align-content-center'>
					<button className='p-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-400'>
						Drag n drop some files here, or click to select files
					</button>
					<h3 className='self-center mt-5'>Uploaded {progress}%</h3>
				</div>
			</div>
		</div>
	);
}
