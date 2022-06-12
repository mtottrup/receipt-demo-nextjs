import React from 'react';
import { Field } from 'formik';
import styles from '../styles.module.css';

export default function FormikCheckBox(props) {
	const { label, name, value, ...rest } = props;

	return (
		<div>
			<label className={styles.label}>
				<Field type='checkbox' name={name} className='mr-2' />
				{label}
			</label>
		</div>
	);
}
