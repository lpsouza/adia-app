import { ReactElement } from "react";

import SidebarLayout from "@/layouts/SidebarLayout";
import Head from "next/head";
import PageTitleWrapper from "@/components/PageTitleWrapper";
import PageTitle from "@/components/PageTitle";

const IndexPage = () => {
    return (
        <>
            <Head>
                <title>Inicial</title>
            </Head>
            <PageTitleWrapper>
                <PageTitle
                    heading="Inicial"
                />
            </PageTitleWrapper>
        </>
    );
}

export default IndexPage;

IndexPage.getLayout = function getLayout(page: ReactElement) {
    return <SidebarLayout>{page}</SidebarLayout>;
};
