import Head from "next/head";
import { useRouter } from "next/router";

import SideMenuLayout from "@/components/SideMenuLayout";
import AppForm from "@/components/Core/App/Form";

const AppsEditPage = () => {
  const router = useRouter()
  const { id } = router.query
  return (
    <SideMenuLayout>
      <Head>
        <title>Apps - Editar</title>
      </Head>
      <AppForm id={id} />
    </SideMenuLayout>
  );
}

export default AppsEditPage;
