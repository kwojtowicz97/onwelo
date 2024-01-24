export type Book = {
  trackId: number;
  trackName: string;
  releaseDate: string;
  artistIds: number[];
  artworkUrl60: string;
  artworkUrl100: string;
  artistViewUrl: string;
  trackCensoredName: string;
  fileSizeBytes: number;
  formattedPrice: string;
  trackViewUrl: string;
  currency: string;
  description: string;
  price: number;
  genres: string[];
  genreIds: string[];
  artistId: number;
  artistName: string;
  kind: string;
  userRatingCount: number;
  averageUserRating: number;
};

export type AppleApiResponse = {
  resultCount: number;
  results: Book[];
};
