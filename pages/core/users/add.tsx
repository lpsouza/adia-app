import Head from "next/head";

import SideMenuLayout from "@/components/SideMenuLayout";
import Form from "@/components/Core/User/Form";

const UsersAddPage = () => {
  return (
    <SideMenuLayout>
      <Head>
        <title>Usuários - Adicionar</title>
      </Head>
      <Form />
    </SideMenuLayout>
  );
}

export default UsersAddPage;
