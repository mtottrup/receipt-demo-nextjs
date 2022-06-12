import { createContext, useContext, useEffect, useState } from 'react';
import firebase from '../api/firebase';
import Login from '../components/login/Login';
const AuthContext = createContext([]);

export const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const getAuth = firebase.auth;

	useEffect(() => {
		return getAuth.onIdTokenChanged(async user => {
			if (!user) {
				setCurrentUser(null);
				setLoading(false);
				return;
			}
			const token = await user.getIdToken();
			setCurrentUser(user);
			setLoading(false);
		});
	}, []);

	if (!currentUser) {
		return <Login />;
	} else {
		return <AuthContext.Provider value={{ currentUser }}>{children}</AuthContext.Provider>;
	}
};

export const useAuth = () => useContext(AuthContext);
