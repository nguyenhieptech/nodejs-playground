# 🟢 NodeJS Playground 🟢

Repo for learning NodeJS core concepts.

NodeJS, TypeScript and ESBuild.

## Run locally

```bash
pnpm install # or npm, yarn, bun, whatever

# Copy examples from `src/core` to `src/index.ts`, and then run
pnpm dev
```

## Run with Docker

### Building and running your application

When you're ready, start your application by running with Docker BuildKit:

```bash
DOCKER_BUILDKIT=1 docker compose up --build
```

Your application will be available at http://localhost:4040.

### Deploying your application to the cloud

First, build your image, e.g.: `DOCKER_BUILDKIT=1 docker build -t nodejs-playground:v1 .`.
If your cloud uses a different CPU architecture than your development
machine (e.g., you are on a Mac M1 and your cloud provider is amd64),
you'll want to build the image for that platform, e.g.:
`DOCKER_BUILDKIT=1 docker build --platform=linux/amd64 -t nodejs-playground:v1 .`.

Then, push it to your registry, e.g. `docker push myregistry.com/nodejs-playground:v1`.

Consult Docker's [getting started](https://docs.docker.com/go/get-started-sharing/)
docs for more detail on building and pushing.

## References

- [Build a Node App With TypeScript & ESBuild](https://www.totaltypescript.com/build-a-node-app-with-typescript-and-esbuild)
- [Docker's Node.js guide](https://docs.docker.com/guides/nodejs/)
