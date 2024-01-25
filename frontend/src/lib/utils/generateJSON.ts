export const convertObjectToJSON = (objArray: object[]) => {
	return JSON.stringify(objArray, null, 2);
};

export const downloadJSON = (data: string, filename: string) => {
	const blob = new Blob([data], { type: 'application/json' });
	const link = document.createElement('a');
	link.href = window.URL.createObjectURL(blob);
	link.download = filename;
	link.click();
};
