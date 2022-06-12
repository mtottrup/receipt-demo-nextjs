import Modal from 'react-modal';
import styles from './styles.module.css';

export default function DeleteModal(props) {
	const { modalIsOpen, closeModal, deleteSuccess, deleteClick, activeDocument } = props;
	const deleteModalStyles = {
		content: {
			top: '50%',
			left: '50%',
			right: 'auto',
			bottom: 'auto',
			marginRight: '',
			transform: 'translate(-50%, -50%)',
		},
	};

	return (
		<Modal
			style={deleteModalStyles}
			ariaHideApp={false}
			isOpen={modalIsOpen}
			onRequestClose={closeModal}>
			<button onClick={closeModal}>X</button>
			{deleteSuccess ? (
				<div>File Deleted!</div>
			) : (
				<>
					<div>Do you really want to delete?</div>
					<div className='flex flex-row justify-center'>
						<button
							onClick={() => {
								deleteClick(activeDocument);
							}}
							className={styles.deleteButton}>
							Yes
						</button>
						<button onClick={closeModal} className={styles.deleteButton}>
							No
						</button>
					</div>
				</>
			)}
		</Modal>
	);
}
