import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from "next-auth/jwt";
import httpProxyMiddleware from "next-http-proxy-middleware";

export const config = {
    api: {
        bodyParser: false,
    },
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const token = await getToken({ req })

    if (token) {
        const financeApi = await fetch(`${process.env.CORE_API}/apps/${process.env.FINANCE_APP_ID}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });

        if (!financeApi.ok) {
            res.status(500).json({ message: "Finance API is offline" });
            return;
        }

        await httpProxyMiddleware(req, res, {
            target: `${(await financeApi.json()).endpoint}/ofx/importer`,
            changeOrigin: true,
            pathRewrite: [
                {
                    patternStr: "/api/finance/ofx/importer",
                    replaceStr: "",
                },
            ],
        });

    } else {
        res.status(401).json({ message: "Unauthorized" });
    }
}
