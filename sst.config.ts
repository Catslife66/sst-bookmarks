// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "sst-bookmarks",
      removal: input?.stage === "production" ? "retain" : "remove",
      // protect: ["production"].includes(input?.stage),
      home: "aws",
      providers: {
        aws: {
          region: "eu-west-1",
          profile: input?.stage === "staging" ? "staging" : "default",
        },
      },
    };
  },
  async run() {
    const dbUrl = new sst.Secret("DATABASE_URL");
    const githubClientId = new sst.Secret("GITHUB_CLIENT_ID");
    const githubClientSecret = new sst.Secret("GITHUB_CLIENT_SECRET");

    const auth = new sst.aws.Auth("MyAuth", {
      issuer: {
        handler: "auth/index.handler",
        link: [dbUrl, githubClientId, githubClientSecret],
      },
    });

    new sst.aws.Nextjs("MyWeb", {
      link: [auth, dbUrl, githubClientId, githubClientSecret],
    });
  },
});
