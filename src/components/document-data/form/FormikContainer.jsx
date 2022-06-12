import { Formik, Form } from 'formik';
import { DocumentContext } from '../../../context/DocumentContext';
import { useContext, useEffect, useState } from 'react';
import { formatTotalField } from '../../../helpers/currencyHelpers';
import { onDocumentsChange, updateDocument } from '../../../api/firebaseFirestore';
import FormikControl from './FormikControl';
import DeleteModal from '../DeleteModal';
import { deleteFile } from '../../../api/firebaseStorage';

export default function FormikContainer() {
	const { activeDocument } = useContext(DocumentContext);
	const [documentTypes, setDocumentTypes] = useState([]);
	const [categories, setCategories] = useState([]);
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [deleteSuccess, setDeleteSuccess] = useState(false);
	const [initialValues, setinitialValues] = useState({
		name: activeDocument?.name == undefined ? ' ' : activeDocument?.name,
		ref: activeDocument?.ref == undefined ? ' ' : activeDocument?.ref,
		date: currentDate,
		total: activeDocument?.total == undefined ? '' : formatTotalField(activeDocument?.total),
		documentType: activeDocument?.documentType == undefined ? '' : activeDocument?.documentType,
		category: activeDocument?.category == undefined ? '' : activeDocument?.category,
		reviewed: activeDocument?.reviewed == undefined ? '' : activeDocument?.reviewed,
		exported: activeDocument?.exported == undefined ? '' : activeDocument?.exported,
	});

	const currentDate =
		activeDocument?.date === undefined ||
		activeDocument?.date === '' ||
		activeDocument?.date === null
			? null
			: activeDocument?.date.toDate();

	useEffect(() => {
		setinitialValues({
			name: activeDocument?.name == undefined ? ' ' : activeDocument?.name,
			ref: activeDocument?.ref == undefined ? ' ' : activeDocument?.ref,
			date: currentDate,
			total: activeDocument?.total == undefined ? '' : formatTotalField(activeDocument?.total),
			documentType: activeDocument?.documentType == undefined ? '' : activeDocument?.documentType,
			category: activeDocument?.category == undefined ? '' : activeDocument?.category,
			reviewed: activeDocument?.reviewed == undefined ? '' : activeDocument?.reviewed,
			exported: activeDocument?.exported == undefined ? '' : activeDocument?.exported,
		});
	}, [activeDocument]);

	useEffect(() => {
		const configSnapUnsubscribe = onDocumentsChange(data => {
			setDocumentTypes(data.filter(x => x.id === 'lists')[0].documentTypes);
			setCategories(data.filter(x => x.id === 'lists')[0].categories);
		}, 'config');

		return () => {
			configSnapUnsubscribe();
		};
	}, []);

	function onSubmit(values) {
		updateDocument(values, activeDocument);
	}

	function openModal() {
		setDeleteSuccess(false);
		setModalIsOpen(true);
	}

	function closeModal() {
		setDeleteSuccess(false);
		setModalIsOpen(false);
	}

	function validateTotal(value) {
		let error;
		if (!/^\$?\d+(,\d{3})*\.?[0-9]?[0-9]?$/.test(value) && value != '') {
			error = 'Invalid Currency Format';
		}
		return error;
	}

	return (
		<Formik enableReinitialize initialValues={initialValues} onSubmit={onSubmit}>
			{({ formik, errors, isValidating, touched }) => (
				<Form className='px-3 my-2'>
					<FormikControl
						control='select'
						label='Document Type'
						name='documentType'
						options={documentTypes}
						selected={activeDocument?.documentType}
					/>
					<FormikControl
						control='select'
						label='Category'
						name='category'
						options={categories}
						selected={activeDocument?.category}
					/>
					<FormikControl control='input' label='Name' name='name' />
					<FormikControl control='date-picker' label='Date' name='date' defaultDate={currentDate} />
					<FormikControl control='input' label='Ref' name='ref' />
					<FormikControl control='input' label='Total' name='total' validate={validateTotal} />
					<FormikControl control='checkbox' label='Reviewed' name='reviewed' />
					<FormikControl control='checkbox' label='Exported' name='exported' />
					<FormikControl control='button' label='Save' type='submit' isSubmitting='isSubmitting' />
					<FormikControl
						control='button'
						label='Delete'
						type='submit'
						onClick={() => openModal()}
					/>
					<DeleteModal
						modalIsOpen={modalIsOpen}
						closeModal={closeModal}
						deleteClick={() => deleteFile(activeDocument, setDeleteSuccess)}
						deleteSuccess={deleteSuccess}
						activeDocument={activeDocument}
					/>
				</Form>
			)}
		</Formik>
	);
}
