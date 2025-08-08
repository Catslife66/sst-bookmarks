import { object, string, email } from "valibot";
import { createSubjects } from "@openauthjs/openauth/subject";

export const subjects = createSubjects({
  user: object({
    id: string(),
    email: email(),
  }),
});
