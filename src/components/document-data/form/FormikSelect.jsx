import React from 'react';
import { Field, ErrorMessage } from 'formik';
import FormikTextError from './FormikTextError';

import styles from '../styles.module.css';

export default function FormikSelect(props) {
	const { label, name, selected, options, ...rest } = props;
	const selectOptions = ['Undefined', ...options];

	const selection = selected == '' ? 'none' : selected;
	return (
		<div>
			<label className={styles.label} htmlFor={name}>
				{label}
			</label>
			<br />
			<Field as='select' id={name} name={name} {...rest} defaultValue={selection}>
				{selectOptions.map((option, index) => {
					return option === selection ? (
						<option selected key={index} value={option}>
							{option}
						</option>
					) : (
						<option key={index} value={option}>
							{option}
						</option>
					);
				})}
			</Field>
			<ErrorMessage name={name} component={FormikTextError} />
		</div>
	);
}
