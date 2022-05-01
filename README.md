# NextJS FullStack Starter

A starter for NextJS fullstack projects with all you need to start your side project or your dream. Do your thing.

## Features

- ⚡ API using [tRPC](https://trpc.io)
- ⚡ Database with [Prisma](https://www.prisma.io/) & Postgres
- ⚙️ Auth with [NextAuth](https://next-auth.js.org/)
- Credentials setup for Email and Password
  - Forgot Password email and template
- Blog example
  - Create post
  - Show all posts
  - Protected routes
  - Protected API routes
- 🎨 ESLint + Prettier + [Lint Staged](https://github.com/okonet/lint-staged)
- 💚 CI setup using GitHub Actions:
  - ✅ Build
  - ✅ Linting

## Pages

- Post list
- Single post
- Create a post
- Sign in
- Sign up
- Request a new password
- Change Password
-

### Screenshots

<details>
<summary>Post list</summary>
<img src="/docs/list.png" alt="post list" />
</details>

## Development

### Requirements

- Node >= 14
- Docker (for running Postgres)

### Start project

```bash
git clone https://github.com/SaraVieira/next-fullstack-starter
cd trpc-prisma-starter
yarn
yarn dx

```

### Commands

```bash
yarn build # runs `prisma generate` + `prisma migrate` + `next build`
yarn db-nuke # resets local db
yarn dev # starts next.js
yarn dx # starts postgres db + runs migrations + seeds + starts next.js
yarn lint # runs eslint on all files
```

## Deployment

### Using [Render](https://render.com/)

The project contains a [`render.yaml`](./render.yaml) [_"Blueprint"_](https://render.com/docs/blueprint-spec) which makes the project easily deployable on [Render](https://render.com/).

Go to [dashboard.render.com/blueprints](https://dashboard.render.com/blueprints) and connect to this Blueprint and see how the app and database automatically gets deployed.

## License

MIT
