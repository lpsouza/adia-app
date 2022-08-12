import Head from "next/head";
import { useRouter } from "next/router";

import SideMenuLayout from "@/components/SideMenuLayout";
import UserForm from "@/components/Core/UserForm";

const UsersEditPage = () => {
  const router = useRouter()
  const { email } = router.query
  return (
    <SideMenuLayout>
      <Head>
        <title>Usuários - Editar</title>
      </Head>
      <UserForm email={email} />
    </SideMenuLayout>
  );
}

export default UsersEditPage;
