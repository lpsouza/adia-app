import Head from "next/head";

import SideMenuLayout from "@/components/SideMenuLayout";
import UserForm from "@/components/Core/UserForm";

const UsersAddPage = () => {
  return (
    <SideMenuLayout>
      <Head>
        <title>Usuários - Adicionar</title>
      </Head>
      <UserForm />
    </SideMenuLayout>
  );
}

export default UsersAddPage;
