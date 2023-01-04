import Head from "next/head";

import SideMenuLayout from "@/components/SideMenuLayout";
import List from '@/components/Finance/Wallet/List'

const WalletsListPage = () => {
    return (
        <SideMenuLayout>
            <Head>
                <title>Carteiras</title>
            </Head>
            <List />
        </SideMenuLayout>
    );
}

export default WalletsListPage;
