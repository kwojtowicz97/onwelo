type NestedObject = {
	[key: string]: unknown;
};

export const flattenObject = (obj: { [key: string]: unknown }, parentKey: string = ''): object => {
	const result: NestedObject = {};

	for (const key in obj) {
		if (Object.prototype.hasOwnProperty.call(obj, key)) {
			const newKey = parentKey ? `${parentKey}.${key}` : key;

			if (typeof obj[key] === 'object' && obj[key] !== null) {
				// Recursively flatten nested objects
				Object.assign(result, flattenObject(obj[key] as NestedObject, newKey));
			} else {
				// Assign non-object values to the result
				result[newKey] = obj[key];
			}
		}
	}

	return result;
};
