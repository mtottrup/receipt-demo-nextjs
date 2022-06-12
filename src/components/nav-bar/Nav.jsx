import { useState, useContext } from 'react';
import { SearchIcon, TableIcon, TemplateIcon } from '@heroicons/react/outline';
import firebase from '../../api/firebase';
import SearchBox from './SearchBox';
import UploadModal from './UploadModal';
import { DocumentContext } from '../../context/DocumentContext';

export default function Nav() {
	const currentUser = firebase.auth.currentUser;
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const { gridView, setGridView } = useContext(DocumentContext);

	function openModal() {
		setModalIsOpen(true);
	}

	function closeModal() {
		setModalIsOpen(false);
	}

	return (
		<div className='bg-indigo-600'>
			<div className='px-3 py-3 mx-auto max-w-11/12 sm:px-6 lg:px-8'>
				<div className='flex items-center justify-between flew-wrap'>
					<div className='flex items-center w-0'>
						<span>
							{gridView ? (
								<button onClick={() => setGridView(false)}>
									<TemplateIcon className='w-12 mr-4 text-white' />
								</button>
							) : (
								<button onClick={() => setGridView(true)}>
									<TableIcon className='w-12 mr-4 text-white' />
								</button>
							)}
						</span>
						<span className='flex p-2 bg-indigo-800 rounded-lg'>
							<SearchIcon className='w-6 h-6 text-white' />
						</span>
						<div>
							<SearchBox />
						</div>
						<button
							onClick={openModal}
							className='flex items-center justify-center px-4 py-2 text-sm font-medium text-indigo-600 bg-white border rounded-md shadow-sm border-transparet hover:bg-indigo-50 active:bg-indigo-300'>
							Upload
						</button>
						<UploadModal isOpen={modalIsOpen} onRequestClose={closeModal} onClick={closeModal} />
					</div>
					<div className='flex-shrink-0 w-full mt-2 sm:mt-0 sm:w-auto'>
						<div className='flex flex-row'>
							<div className='pr-3 text-white'>{currentUser.email}</div>
							<button
								onClick={() => firebase.auth.signOut()}
								className='flex items-center justify-center px-4 py-2 text-sm font-medium text-indigo-600 bg-white border rounded-md shadow-sm border-transparet hover:bg-indigo-50 active:bg-indigo-300'>
								Logout
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
