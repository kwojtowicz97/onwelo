export const convertObjectToCSV = (objArray: object[]) => {
	const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
	let csv = '';

	// Add headers
	csv += Object.keys(array[0]).join(',') + '\r\n';

	// Add values
	array.forEach((obj: object) => {
		csv += Object.values(obj).join(',') + '\r\n';
	});

	return csv;
};

export const downloadCSV = (data: string, filename: string) => {
	const blob = new Blob([data], { type: 'text/csv' });
	const link = document.createElement('a');
	link.href = window.URL.createObjectURL(blob);
	link.download = filename;
	link.click();
};
