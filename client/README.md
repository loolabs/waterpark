# Waterpark Client

The web app for Waterpark.

## Developer Quick Start

1. Copy the following into a file named `.env.local` in this directory.

   ```
   NEXT_PUBLIC_API_URL=https://waterpark-staging.herokuapp.com/api/v1
   ```

   See [configuration](#Configuration) for how to customize the frontend environment.

1. Run the development server.

   ```bash
   npm run dev
   ```

1. Open [http://localhost:3000](http://localhost:3000) with your browser to see the Waterpark client.

1. You are ready to work on the Waterpark client! While the development server is still running, the browser page auto-updates to match any changes you save in this directory.

## Configuration

The Waterpark client requires the following environment variables:

| Variable              | Description                  | Example Value                                                                          |
| --------------------- | ---------------------------- | -------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_API_URL` | the URL of the Waterpark API | `http://localhost:3001/api/v1`<br/>(full-stack developers will find this value useful) |

## Stack

### TypeScript

Almost every code file in the Waterpark client has `.ts` or `.tsx` as its extension, meaning that it is written in TypeScript. In a nutshell, TypeScript is a superset of JavaScript that adds types.

- [TypeScript documentation](https://www.typescriptlang.org/docs)

Beyond our Prettier configuration, Loo Labs does not have a style guide for writing TypeScript. However, here are some practices we look out for in code review:

- [Daniel Bartholomae - 10 bad TypeScript habits to break this year](https://startup-cto.net/10-bad-typescript-habits-to-break-this-year/)

### React / Next.js

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). Next.js is a wrapper over the [React](https://reactjs.org/) UI library that makes it easy to do things that are considered standard in most web apps.

- [React documentation](https://reactjs.org/docs)
- [React tutorial](https://reactjs.org/tutorial)
- [Next.js documentation](https://nextjs.org/docs)
- [Next.js tutorial](https://nextjs.org/learn)

Like most modern React teams, Loo Labs uses exclusively functional components and hooks.

### CSS / `styled-components`

[`styled-components`](https://styled-components.com) allows CSS styles to be written directly in the same `.tsx` files where React components are defined.

- [DevDocs - CSS documentation](https://devdocs.io/css/)
- [Mozilla - CSS documentation](https://developer.mozilla.org/docs/Web/CSS)
- [Flexbox Froggy](https://flexboxfroggy.com/)
- [`styled-components` documentation](https://styled-components.com/docs)
- see the _Frontend Styling_ spike in the Loo Labs Notion for why we chose `styled-components`

There are often many ways to implement the same style in CSS. However, here are some practices we look out for in code review:

- [Mozilla - Responsive Design](https://developer.mozilla.org/docs/Learn/CSS/CSS_layout/Responsive_Design)
- [mickey - Mobile First CSS](https://www.mightyminnow.com/2013/11/what-is-mobile-first-css-and-why-does-it-rock/)

### React Query

To communicate with the Waterpark API, the client uses [React Query](https://react-query.tanstack.com/).

- [React Query documentation](https://react-query.tanstack.com/overview)
- see the _HTTP Client_ spike in the Loo Labs Notion for why we chose styled components

## Deployment

The Waterpark client is deployed with [Vercel](https://vercel.com), the creators of Next.js. The deployment of `main` can be found at https://waterpark-loo-labs.vercel.app/.

For pull request preview deployments, the obscure [`vercel-is-pull-request`](https://www.npmjs.com/package/vercel-is-pull-request) npm package augments the environment variables of the deployment to include the PR number. The history of this hacky workaround can be found in [issue #40](https://github.com/loolabs/waterpark/issues/40).
