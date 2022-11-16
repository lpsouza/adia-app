import Head from "next/head";

import SideMenuLayout from "@/components/SideMenuLayout";
import Form from "@/components/Core/App/Form";

const AppsAddPage = () => {
  return (
    <SideMenuLayout>
      <Head>
        <title>Apps - Adicionar</title>
      </Head>
      <Form />
    </SideMenuLayout>
  );
}

export default AppsAddPage;
