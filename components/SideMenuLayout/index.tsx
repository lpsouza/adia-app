import { Grid } from "@mui/material";
import { PropsWithChildren } from "react";
import Logo from "@/components/Logo";
import SideMenu from "@/components/SideMenu";
import TopMenu from "@/components/TopMenu";

const SideMenuLayout: any = ({ children }: PropsWithChildren<{}>) => {
    const menuSize = 2;
    const contentSize = 12 - menuSize;
    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <Grid container spacing={1}>
                    <Grid item xs={menuSize}>
                        <Logo />
                    </Grid>
                    <Grid item xs={contentSize}>
                        <TopMenu />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={menuSize}>
                <SideMenu />
            </Grid>
            <Grid item xs={contentSize}>{children}</Grid>
        </Grid>
    )
}

export default SideMenuLayout;