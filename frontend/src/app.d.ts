// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

type Ebook = {
	title: string;
	name: string;
	price: number;
	curr: string;
	date: string; // Assuming this is a string representation of a date
	fromNBP: {
		pricePLN: number;
		rate: number;
		tableNo: string;
	};
};

export { Ebook };
