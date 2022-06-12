import React from 'react';
import FormikButton from './FormikButton';
import FormikCheckBox from './FormikCheckBox';
import FormikDatePicker from './FormikDatePicker';
import FormikInput from './FormikInput';
import FormikSelect from './FormikSelect';

export default function FormikControl(props) {
	const { control, ...rest } = props;

	switch (control) {
		case 'input':
			return <FormikInput {...rest} />;
		case 'select':
			return <FormikSelect {...rest} />;
		case 'checkbox':
			return <FormikCheckBox {...rest} />;
		case 'button':
			return <FormikButton {...rest} />;
		case 'date-picker':
			return <FormikDatePicker {...rest} />;
		default:
			return null;
	}
	return <div>FormikControl</div>;
}
