import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from "next-auth/jwt";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const token = await getToken({ req });

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

        const response = await fetch(`${(await financeApi.json()).endpoint}/wallets`, {
            method: req.method,
            headers: {
                "Content-Type": "application/json",
            },
            body: req.method === "POST" ? JSON.stringify(req.body) : null
        });
        res.status(response.status).json(await response.json());
    } else {
        res.status(401).json({ message: "Unauthorized" });
    }
}
