import Head from "next/head";

import SideMenuLayout from "@/components/SideMenuLayout";
import AppForm from "@/components/Core/AppForm";

const AppsAddPage = () => {
  return (
    <SideMenuLayout>
      <Head>
        <title>Apps - Adicionar</title>
      </Head>
      <AppForm />
    </SideMenuLayout>
  );
}

export default AppsAddPage;
