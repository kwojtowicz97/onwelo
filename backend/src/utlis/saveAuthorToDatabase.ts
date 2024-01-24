import { database } from '../database/db';
import { Author } from '../models/author';

export const saveAuthorToDatabase = async (author: Author) => {
  const existingAuthor = await database('authors')
    .where({
      apple_id: author.apple_id,
    })
    .first();

  if (existingAuthor) {
    return existingAuthor;
  }

  const savedAuthor = await database('authors').insert({
    name: author.name,
    apple_id: author.apple_id,
  });
  return savedAuthor;
};
