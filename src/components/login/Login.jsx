import { useState } from 'react';
import { LockClosedIcon } from '@heroicons/react/solid';
import { signInWithEmailAndPassword } from 'firebase/auth';
import firebase from '../../api/firebase';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export default function Login() {
	const [loginError, setLoginError] = useState('');
	const auth = firebase.auth;
	function handleLogin(auth, email, password) {
		signInWithEmailAndPassword(auth, email, password).catch(function (error) {
			setLoginError('Invalid Credentials');
		});
	}
	return (
		<>
			<div className='flex items-center justify-center min-h-full px-4 py-12 sm:px-6 lg:px-8'>
				<div className='w-full max-w-md space-y-8'>
					<div>
						<h2 className='mt-6 text-3xl font-extrabold text-center text-gray-900'>
							Sign in to your account
						</h2>
					</div>
					<Formik
						initialValues={{
							email: '',
							password: '',
						}}
						validationSchema={Yup.object({
							email: Yup.string().email('Invalid email address').required('Required'),
							password: Yup.string().required('No password provided'),
						})}
						onSubmit={values => {
							handleLogin(auth, values.email, values.password);
						}}>
						<Form className='mt-8 space-y-6'>
							<div className='-space-y-px rounded-md shadow-sm'>
								<div>
									<Field
										id='email'
										name='email'
										type='email'
										className='relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
										placeholder='Email address'
									/>
									<ErrorMessage name='email' className='text-sm font-medium text-indigo-600' />
								</div>
								<div>
									<Field
										id='password'
										name='password'
										type='password'
										className='relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
										placeholder='Password'
									/>
									<ErrorMessage name='password' className='text-sm font-medium text-indigo-600' />
								</div>
							</div>

							<div className='flex items-center justify-between'>
								{loginError ? (
									<div className='text-sm font-medium text-indigo-600'>{loginError}</div>
								) : (
									<div className='flex items-center'></div>
								)}
							</div>

							<div>
								<button
									type='submit'
									className='relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
									<span className='absolute inset-y-0 left-0 flex items-center pl-3'>
										<LockClosedIcon
											className='w-5 h-5 text-indigo-500 group-hover:text-indigo-400'
											aria-hidden='true'
										/>
									</span>
									Sign in
								</button>
							</div>
						</Form>
					</Formik>
				</div>
			</div>
		</>
	);
}
