import { v4 as uuidv4 } from 'uuid';

export function getUniqueUuid(fileDetailsArray) {
	let unique = false;
	let uniqueCode = '';

	while (!unique) {
		const uuid = uuidv4();
		if (fileDetailsArray.filter(el => el.id === uuid).length < 1) {
			uniqueCode = uuid;
			unique = true;
		}
	}

	return uniqueCode;
}
