import Head from "next/head";
import { useRouter } from "next/router";

import SideMenuLayout from "@/components/SideMenuLayout";
import Form from "@/components/Core/User/Form";

const UsersEditPage = () => {
  const router = useRouter()
  const { email } = router.query
  return (
    <SideMenuLayout>
      <Head>
        <title>Usuários - Editar</title>
      </Head>
      <Form email={email} />
    </SideMenuLayout>
  );
}

export default UsersEditPage;
