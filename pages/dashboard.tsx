import { ReactElement } from "react";

import SidebarLayout from "@/layouts/SidebarLayout";
import Head from "next/head";
import PageTitleWrapper from "@/components/PageTitleWrapper";
import PageTitle from "@/components/PageTitle";

const DashboardPage = () => {
    return (
        <>
            <Head>
                <title>Dashboard</title>
            </Head>
            <PageTitleWrapper>
                <PageTitle
                    heading="Dashboard"
                />
            </PageTitleWrapper>
        </>
    );
}

export default DashboardPage;

DashboardPage.getLayout = function getLayout(page: ReactElement) {
    return <SidebarLayout>{page}</SidebarLayout>;
};
