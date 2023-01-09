import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from "next-auth/jwt";
import formidable from "formidable";
import { FormData } from "formdata-node";
import { Writable } from 'stream';

const formidableConfig = {
    keepExtensions: true,
    maxFileSize: 10000000,
    maxFieldsSize: 10000000,
    maxFields: 7,
    allowEmptyFiles: false,
    multiples: false,
};

function formidablePromise(
    req: NextApiRequest,
    opts?: Parameters<typeof formidable>[0]
): Promise<{ fields: formidable.Fields; files: formidable.Files }> {
    return new Promise((accept, reject) => {
        const form = formidable(opts);

        form.parse(req, (err, fields, files) => {
            if (err) {
                return reject(err);
            }
            return accept({ fields, files });
        });
    });
}

const fileConsumer = <T = unknown>(acc: T[]) => {
    const writable = new Writable({
        write: (chunk, _enc, next) => {
            acc.push(chunk);
            next();
        },
    });

    return writable;
};

export const config = {
    api: {
        bodyParser: false
    }
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

        const chunks: never[] = [];

        const { fields, files } = await formidablePromise(req, {
            ...formidableConfig,
            fileWriteStreamHandler: () => fileConsumer(chunks),
        });

        const fileData = Buffer.concat(chunks);

        const formData = new FormData();
        formData.append("ofxFile", fileData);
        formData.append("walletId", fields.walletId);

        console.log(formData.getAll("ofxFile"));
        console.log(formData.getAll("walletId"));

        const response = await fetch(`${(await financeApi.json()).endpoint}/ofx/importer`, {
            method: req.method,
            headers: {
                "Content-Type": "form-data",
            },
            body: req.method === "POST" ? formData as BodyInit : null
        });
        res.status(response.status).json(await response.json());
    } else {
        res.status(401).json({ message: "Unauthorized" });
    }
}