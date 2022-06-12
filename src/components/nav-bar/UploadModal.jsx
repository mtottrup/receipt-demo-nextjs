import React from 'react';
import Modal from 'react-modal';
import { XIcon } from '@heroicons/react/solid';
import MyDropzone from './MyDropZone';

export default function UploadModal(props) {
	const { isOpen, onRequestClose, onClick } = props;
	return (
		<>
			<Modal
				className='absolute w-3/4 -translate-x-1/2 -translate-y-1/2 bg-indigo-200 rounded-md h-3/4 left-1/2 top-1/2'
				ariaHideApp={false}
				isOpen={isOpen}
				onRequestClose={onRequestClose}>
				<button onClick={onClick}>
					<XIcon className='ml-1 text-black w-7 h-7' />
				</button>
				<MyDropzone />
			</Modal>
		</>
	);
}
