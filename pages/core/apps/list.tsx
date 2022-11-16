import Head from "next/head";

import SideMenuLayout from "@/components/SideMenuLayout";
import List from '@/components/Core/App/List'

const AppsListPage = () => {
  return (
    <SideMenuLayout>
      <Head>
        <title>Apps</title>
      </Head>
      <List />
    </SideMenuLayout>
  );
}

export default AppsListPage;
