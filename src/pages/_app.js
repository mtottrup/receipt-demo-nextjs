import { AuthProvider } from '../context/AuthContext';
import './globals.css';

function MyApp({ Component, pageProps }) {
	return (
		<AuthProvider>
			<Component className='h-screen' {...pageProps} />;
		</AuthProvider>
	);
}

export default MyApp;
