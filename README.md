# A.D.I.A. Frontend

This is the frontend of the A.D.I.A. (Automated Digital Intelligence Assistant).

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
