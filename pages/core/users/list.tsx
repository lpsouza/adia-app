import Head from "next/head";

import SideMenuLayout from "@/components/SideMenuLayout";
import List from '@/components/Core/User/List'

const UsersListPage = () => {
  return (
    <SideMenuLayout>
      <Head>
        <title>Usuários</title>
      </Head>
      <List />
    </SideMenuLayout>
  );
}

export default UsersListPage;
