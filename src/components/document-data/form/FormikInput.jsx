import React from 'react';
import { Field, ErrorMessage } from 'formik';
import FormikTextError from './FormikTextError';
import styles from '../styles.module.css';

export default function FormikInput(props) {
	const { label, name, ...rest } = props;

	return (
		<div className='mb-2 form-control'>
			<label htmlFor={name} className={styles.label}>
				{label}
			</label>
			<br />
			<Field
				className='px-1 text-base border rounded border-slate-300'
				id={name}
				name={name}
				{...rest}
			/>
			<ErrorMessage name={name} component={FormikTextError} />
		</div>
	);
}
