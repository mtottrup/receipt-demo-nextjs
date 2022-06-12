import React from 'react';
import styles from '../styles.module.css';

export default function FormikButton(props) {
	const { type, onClick, label, isSubmitting, ...rest } = props;

	return (
		<button type={type} onClick={onClick} className={styles.formButton}>
			{label}
		</button>
	);
}
