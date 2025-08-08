import * as v from "valibot";

export const bookmarkSchema = v.object({
  title: v.pipe(v.string(), v.nonEmpty("Title is required.")),
  url: v.pipe(
    v.string(),
    v.nonEmpty("Url is required."),
    v.url("It has to be a valid url.")
  ),
  notes: v.optional(v.string()),
  userId: v.pipe(v.string(), v.nonEmpty("User id is required.")),
});

export const uuidSchema = v.pipe(
  v.string(),
  v.uuid("This bookmark id is invalid.")
);
