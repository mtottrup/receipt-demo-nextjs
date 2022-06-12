import firebase from './firebase';
import { collection, onSnapshot, updateDoc, doc, setDoc } from 'firebase/firestore';
import { stripCurrencyString } from '../helpers/currencyHelpers';
import { data } from 'autoprefixer';

const db = firebase.db;

export const onDocumentsChange = (cb, collectionName) => {
	const collectionRef = collection(db, collectionName);

	return onSnapshot(collectionRef, snapshot => {
		let data = snapshot.docs.map(doc => {
			return {
				...doc.data(),
				id: doc.id,
			};
		});
		cb(data, snapshot);
	});
};

export async function createNewFileDoc(file, url, uuid) {
	await setDoc(doc(db, 'fileDetails', uuid), {
		url: url,
		fileName: file.name,
	});
}

export function updateDocument(values, document) {
	if (document) {
		const docRef = doc(db, 'documents', document.id);
		const strippedTotal = stripCurrencyString(values.total);
		updateDoc(docRef, {
			name: values.name,
			total: Number(strippedTotal),
			documentType: values.documentType,
			ref: values.ref,
			date: values.date,
			reviewed: values.reviewed,
			exported: values.exported,
		});
	}
}

export function markExported(data) {
	if (data) {
		data.forEach(element => {
			const docRef = doc(db, 'documents', element.docId);
			updateDoc(docRef, {
				exported: true,
			});
		});
	}
}
