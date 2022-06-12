import { useContext } from 'react';
import { DocumentContext } from '../../context/DocumentContext';
import { currencyFormat } from '../../helpers/currencyHelpers';

export default function DocumentListItem({ document }) {
	const { setActiveDocument, activeDocument, fileDetails } = useContext(DocumentContext);

	return (
		<div
			className={
				activeDocument?.id === document?.id
					? 'flex flex-row bg-indigo-100 justify-between'
					: 'flex flex-row justify-between'
			}
			onClick={() => {
				setActiveDocument(document);
			}}>
			<div className='flex flex-col px-5'>
				<p className='text-sm font-bold'>{document.name ? document.name : 'Name not defined'}</p>
				<p className='text-sm '>
					File Name:
					{
						fileDetails.filter(file => file.id == document.storageFileName.replace('files/', ''))[0]
							?.filename
					}
				</p>
				<p className='text-sm'>
					Date:{' '}
					{document.date
						? new Date(document.date?.seconds * 1000).toLocaleDateString('en-US')
						: 'Date not set'}
				</p>
				<p className='text-sm'>
					Total: {document.total == undefined ? '' : currencyFormat(document.total)}
				</p>
			</div>
			<div
				className={
					activeDocument?.document?.id == document?.id
						? 'flex flex-col bg-indigo-100 justify-end items-end sm:hidden md:hidden lg:flex mr-2'
						: 'flex flex-col justify-end items-end sm:hidden md:hidden lg:flex mr-2'
				}>
				{document.reviewed == true && (
					<>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='w-6 h-6'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'
							strokeWidth={2}>
							<path strokeLinecap='round' strokeLinejoin='round' d='M5 13l4 4L19 7' />
						</svg>
						<span className='text-xs'>Reviewed</span>
					</>
				)}
			</div>
		</div>
	);
}
