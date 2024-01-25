import { PUBLIC_BACKEND_URL } from '$env/static/public';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import type { Ebook } from '../../app';

export const load: PageLoad = async () => {
	const response = await fetch(`${PUBLIC_BACKEND_URL}/ebooks`);
	if (!response.ok) {
		return error(500, 'Something went wrong');
	}
	const ebooksData: Ebook[] = await response.json();
	console.log(ebooksData);

	return { ebooksData };
};
