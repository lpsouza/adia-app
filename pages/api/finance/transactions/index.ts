import DateHelper from '@/helpers/Date';
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

        const { date } = req.query;
        let url = `${(await financeApi.json()).endpoint}/transactions`;

        if (date) {
            const startDate = DateHelper.FirstDateOfMonth(new Date(date as string));
            const endDate = DateHelper.EndDateOfMonth(new Date(date as string));
            url += `?start_date=${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}&end_date=${endDate.getFullYear()}-${endDate.getMonth() + 1}-${endDate.getDate()}`;
        }

        const response = await fetch(url, {
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
