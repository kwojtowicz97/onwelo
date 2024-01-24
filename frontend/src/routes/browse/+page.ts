import type { PageLoad } from './$types';

export const load: PageLoad = ({ url }) => {
	console.log(url);
};
