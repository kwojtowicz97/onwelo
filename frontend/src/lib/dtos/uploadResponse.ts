export type UploadResponseDto = {
	errors: { title: string; author: string; error: string }[];
	ebooks: {
		name: string;
		title: string;
		curr: string;
		price: number;
		relaseDate: string;
		fromNBP?: {
			rate: number;
			pricePLN: number;
			tableNo: string;
		};
	}[];
};
