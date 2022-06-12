import React from 'react';

export default function FormikTextError(props) {
	return <div className='text-sm font-bold text-red-500'>{props.children}</div>;
}
