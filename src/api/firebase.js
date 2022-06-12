import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const config = {
	apiKey: process.env.NEXT_PUBLIC_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
	projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
	messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
	appId: process.env.NEXT_PUBLIC_APP_ID,
};

let app;
const apps = getApps();
if (!apps.length) {
	app = initializeApp(config);
} else {
	app = apps[0];
}

const auth = getAuth();
const storage = getStorage(app);
const db = getFirestore();

const firebaseConfig = {
	config,
	auth,
	db,
	storage,
};

export default firebaseConfig;
