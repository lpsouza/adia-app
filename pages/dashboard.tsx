import { ReactElement, useEffect } from "react";
import Router from "next/router";

import SidebarLayout from "@/layouts/SidebarLayout";
import Head from "next/head";
import PageTitleWrapper from "@/components/PageTitleWrapper";
import PageTitle from "@/components/PageTitle";

const DashboardPage = () => {
    useEffect(() => {
        const accessToken = localStorage.getItem('access_token');
        fetch(`${process.env.NEXT_PUBLIC_CORE_API}/auth/token`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then(res => {
            if (res.status !== 200) {
                Router.push('/auth/login');
            }
        });
    });
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
