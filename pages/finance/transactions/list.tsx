import Head from "next/head";

import SideMenuLayout from "@/components/SideMenuLayout";
import List from '@/components/Finance/Transaction/List'

const UsersListPage = () => {
  return (
    <SideMenuLayout>
      <Head>
        <title>Transações</title>
      </Head>
      <List />
    </SideMenuLayout>
  );
}

export default UsersListPage;
