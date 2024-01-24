import { Ebook } from '../models/ebook';

export type ResponseDto = {
  errors: { title: string; author: string; error: string }[];
  ebooks: Ebook[];
};
