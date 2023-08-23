# Biconomy SDK + Spheron Starter Kit

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

This is a very basic implementation of a login page that generates a Smart Account for new web2 users and gives them access to a page for uploading files powered by Spheron Browser Upload SDK.

[Biconomy Documentation]
[Spheron Documentation](https://docs.spheron.network/)

## Getting Started

First, run the development server:

```bash
npm install
# or
yarn 
# or
pnpm install
```

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## API Route

A single API Route is responsible for creating a token for file uploads. Make sure to rename .env.example to .env and get your token as mentioned in the [Spheron Browser Upload Docs](https://docs.spheron.network/sdk/browser/).

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/upload.ts`.


