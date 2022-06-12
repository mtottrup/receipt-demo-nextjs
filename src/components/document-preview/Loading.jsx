import React from 'react';
import ReactLoading from 'react-loading';

export default function Loading() {
	return (
		<div className='grid h-screen place-items-center'>
			<ReactLoading type={'spin'} color={'blue'} />
		</div>
	);
}
