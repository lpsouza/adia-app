import Head from "next/head";

import UserForm from "@/components/Core/UserForm";

const UsersAddPage = () => {
  return (
    <>
      <Head>
        <title>Usuários</title>
      </Head>
      <UserForm />
    </>
  );
}

export default UsersAddPage;
