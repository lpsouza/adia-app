import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from "next-auth/jwt";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const token = await getToken({ req });
    const id = req.query.id;

    if (token) {
        const response = await fetch(`${process.env.CORE_API}/apps/${id}`, {
            method: req.method,
            headers: {
                "Content-Type": "application/json",
            },
            body: req.method === "PUT" ? JSON.stringify(req.body) : null
        });
        res.status(response.status).json(await response.json());
    } else {
        res.status(401).json({ message: "Unauthorized" });
    }
}
