import Head from "next/head";

import SideMenuLayout from "@/components/SideMenuLayout";
import List from '@/components/Finance/Transaction/List'
import { useRouter } from "next/router";

const TransactionsListPage = () => {
  const router = useRouter()
  const { wallet } = router.query
  return (
    <SideMenuLayout>
      <Head>
        <title>Lançamentos</title>
      </Head>
      <List idx={wallet} />
    </SideMenuLayout>
  );
}

export default TransactionsListPage;
