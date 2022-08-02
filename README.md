# A.D.I.A. Frontend

This is the frontend of the A.D.I.A. (Automated Digital Intelligence Assistant). The web application is based on the [Tokyo Free Black Typescript Next.js Admin Dashboard](https://bloomui.com/product/tokyo-free-black-nextjs-typescript-material-ui-admin-dashboard/) using Next.js and Material-UI.

## A.D.I.A. Architecture

Understand the architecture of the A.D.I.A. [here](https://gist.github.com/lpsouza/a78eee78f2aaac99549a3f10846b7666).

## A.D.I.A. Frontend functionalities

- Management of the A.D.I.A. core.

## Environment Variables

- `NEXT_PUBLIC_CORE_API`: The URL of the A.D.I.A. core API.

## Running with Docker

```bash
docker run -p 3000:3000 -e NEXT_PUBLIC_CORE_API=<CORE-API-URL> --name adia-frontend -d lpsouza/adia-frontend
```
