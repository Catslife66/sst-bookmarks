# Bookmark Manager

A full-stack application for managing bookmarks.  
This project demonstrates CRUD, authentication via OpenAUTH, and deployment with SST to AWS.

## Features

- Add, edit, and delete bookmarks
- User authentication with OpenAuth via github provider
- PostgreSQL database hosted on Neon
- Drizzle ORM for schema and migrations
- CI/CD with GitHub Actions
- Deployed serverlessly with SST + AWS Lambda

## Tech Stack

- Frontend: Next.js (App Router)
- Backend: SST (Serverless Stack)
- Database: Neon (PostgreSQL)
- ORM: Drizzle
- Auth: OpenAuth
- Deployment: AWS Lambda via SST
- CI/CD: GitHub Actions

---

## Setup SST

1. install sst
   npx sst@latest init

2. setup IAM credentials and IAM policy to grant SST access
   Create an IAM user for SST deployment
   By default, AWS credentials are in a file: ~/.aws/credentials on Linux, Unix, macOS
   Specify aws region in sst.config.ts

3. set SST secrets

   - npx sst secret set SECRET_NAME SECRET_VALUE
   - link the secrets in sst.config.ts
   - run 'npx sst dev' or 'npx sst deploy' to update the secret

4. run deploy to aws cloudfront
   npx sst deploy --stage production

---

## Setup drizzle

https://orm.drizzle.team/docs/get-started/neon-new
-npx drizzle-kit generate
-npx drizzle-kit migrate
-create a migrator.js to run migrations command

---

## Setup OpenAUTH

1. follow sst example
   https://openauth.js.org/docs/start/sst/

2. configure prisma db.js
   https://www.prisma.io/docs/orm/prisma-client/deployment/serverless/deploy-to-aws-lambda#deploying-with-sst
