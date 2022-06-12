import { ref, deleteObject, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { doc, deleteDoc, setDoc } from 'firebase/firestore';
import { getUniqueUuid } from '../components/nav-bar/helpers/uuid';
import firebaseConfig from './firebase';
import { createNewFileDoc } from './firebaseFirestore';

const db = firebaseConfig.db;
const storage = firebaseConfig.storage;
const BUCKET_NAME = 'receipts-demo.appspot.com';

export function deleteFile(activeDocument, setDeleteSuccess) {
	const fileRef = ref(storage, activeDocument.storageFileName);

	deleteDoc(doc(db, 'documents', activeDocument.id))
		.catch(console.log('doc not found'))
		.then(deleteDoc(doc(db, 'fileDetails', activeDocument.storageFileName.substring(6))))
		.catch(console.log('doc not found'))
		.then(deleteObject(fileRef))
		.catch(console.log('file not found'))
		.then(setDeleteSuccess(true));
}

export function uploadFile(file, setProgress, fileDetails) {
	const uuid = getUniqueUuid(fileDetails);
	const storageRef = ref(storage, `gs://${BUCKET_NAME}/files/${uuid}`);
	const uploadTask = uploadBytesResumable(storageRef, file);

	uploadTask.on(
		'state_changed_changed',
		snapshot => {
			const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
			setProgress(prog);
		},
		err => console.log(err),
		() => {
			getDownloadURL(uploadTask.snapshot.ref).then(url => createNewFileDoc(file, url, uuid));
		}
	);
}
