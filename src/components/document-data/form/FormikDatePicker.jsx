import React from 'react';
import { Field, ErrorMessage } from 'formik';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import styles from '../styles.module.css';

export default function FormikDatePicker(props) {
	const { defaultDate, onChange, name, label, ...rest } = props;

	return (
		<div className='mb-2 form-group'>
			<label htmlFor='date' className={styles.label}>
				{label}
			</label>
			<Field name={name}>
				{({ form, field }) => {
					const { setFieldValue } = form;
					const { value } = field;
					return (
						<DatePicker
							id={name}
							className='px-1 mb-2 text-base border rounded border-slate-300'
							selected={value}
							{...field}
							{...rest}
							onChange={val => {
								setFieldValue(name, val);
							}}
						/>
					);
				}}
			</Field>
		</div>
	);
}
