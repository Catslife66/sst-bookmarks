import { handle } from "hono/aws-lambda";
import { issuer } from "@openauthjs/openauth";
import { GithubProvider } from "@openauthjs/openauth/provider/github";
import { MemoryStorage } from "@openauthjs/openauth/storage/memory";
import { subjects } from "./subjects";
import { Resource } from "sst";
import { getUser, createUser } from "@/app/lib/actions";
import axios from "axios";

async function getUserInfo(email) {
  const user = (await getUser(email)) || (await createUser(email));
  return user;
}

const app = issuer({
  subjects,
  storage: MemoryStorage(),
  // Remove after setting custom domain
  allow: async () => true,
  providers: {
    github: GithubProvider({
      clientID: Resource.GITHUB_CLIENT_ID.value,
      clientSecret: Resource.GITHUB_CLIENT_SECRET.value,
      scopes: ["user:email"],
    }),
  },
  success: async (ctx, value) => {
    let user;
    if (value.provider === "github") {
      const accessToken = value.tokenset.access;
      const res = await axios.get("https://api.github.com/user", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      user = await getUserInfo(res.data.email);
    }

    return ctx.subject("user", {
      id: user.id,
      email: user.email,
    });
  },
});

export const handler = handle(app);
