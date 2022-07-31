import { ReactElement } from "react";

import SidebarLayout from "@/layouts/SidebarLayout";

const DashboardPage = () => {
    return (
        <h1>Dashboard</h1>
    );
}

export default DashboardPage;

DashboardPage.getLayout = function getLayout(page: ReactElement) {
    return <SidebarLayout>{page}</SidebarLayout>;
};
