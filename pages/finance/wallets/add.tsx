import Head from "next/head";

import SideMenuLayout from "@/components/SideMenuLayout";
import Form from "@/components/Finance/Wallet/Form";

const AppsAddPage = () => {
    return (
        <SideMenuLayout>
            <Head>
                <title>Carteira - Adicionar</title>
            </Head>
            <Form />
        </SideMenuLayout>
    );
}

export default AppsAddPage;
