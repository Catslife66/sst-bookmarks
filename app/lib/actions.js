import { dbClient } from "./db";
import { bookmarks, schema } from "./schema";
import { eq } from "drizzle-orm";

export async function getUser(email) {
  const db = await dbClient();
  const user = await db.query.users.findFirst({
    where: (user, { eq }) => eq(user.email, email),
  });
  return user;
}

export async function createUser(email) {
  const db = await dbClient();
  const [user] = await db
    .insert(schema.users)
    .values({ email: email })
    .returning();
  return user;
}

export async function getAllUsers() {
  const db = await dbClient();
  return await db.query.users.findMany();
}

export async function getBookmark(bookmarkId) {
  const db = await dbClient();

  const bookmark = await db.query.bookmarks.findFirst({
    where: (bookmark, { eq }) => eq(bookmark.id, bookmarkId),
  });
  return bookmark;
}

export async function getUserBookmarks(userId) {
  const db = await dbClient();
  const bookmarks = await db.query.bookmarks.findMany({
    where: (bookmark, { eq }) => eq(bookmark.userId, userId),
    orderBy: (bookmark, { desc }) => [desc(bookmark.createdAt)],
  });
  return bookmarks;
}

export async function createBookmark(data) {
  const db = await dbClient();
  const [bookmark] = await db.insert(schema.bookmarks).values(data).returning();
  return bookmark;
}

export async function updateBookmark(bookmarkId, data) {
  const db = await dbClient();
  return await db
    .update(schema.bookmarks)
    .set({
      title: data.title,
      url: data.url,
      notes: data.notes,
      userId: data.userId,
      updatedAt: new Date(),
    })
    .where(eq(bookmarks.id, bookmarkId));
}

export async function deleteBookmark(bookmarkId) {
  const db = await dbClient();
  return await db.delete(bookmarks).where(eq(bookmarks.id, bookmarkId));
}
