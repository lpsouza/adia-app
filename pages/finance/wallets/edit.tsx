import Head from "next/head";
import { useRouter } from "next/router";

import SideMenuLayout from "@/components/SideMenuLayout";
import Form from "@/components/Finance/Wallet/Form";

const AppsEditPage = () => {
    const router = useRouter()
    const { id } = router.query
    return (
        <SideMenuLayout>
            <Head>
                <title>Carteira - Editar</title>
            </Head>
            <Form idx={id} />
        </SideMenuLayout>
    );
}

export default AppsEditPage;
