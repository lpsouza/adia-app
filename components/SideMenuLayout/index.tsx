import { createTheme, Grid } from "@mui/material";
import { PropsWithChildren } from "react";
import Logo from "@/components/Logo";
import SideMenu from "@/components/SideMenuLayout/SideMenu";
import TopMenu from "@/components/SideMenuLayout/TopMenu";
import themeSelector from "@/styles/themeSelector";

const theme = createTheme(themeSelector());

const SideMenuLayout: any = ({ children }: PropsWithChildren<{}>) => {
    const menuSize = 2;
    const contentSize = 12 - menuSize;

    const cssTopMenu = {
        borderBottom: `1px solid ${theme.palette.grey[800]}`
    }
    const cssLogo = {
        borderRight: `1px solid ${theme.palette.grey[800]}`,
        backgroundColor: theme.palette.grey[900],
        paddingTop: theme.spacing(1),
    }
    const cssSideMenu = {
        borderRight: `1px solid ${theme.palette.grey[800]}`,
        backgroundColor: theme.palette.grey[900]
    }
    const cssContent = {
        position: "fixed",
        height: "100%"
    }

    return (
        <>
            <div>
                <Grid container sx={cssTopMenu}>
                    <Grid item sx={cssLogo} xs={menuSize}>
                        <Logo />
                    </Grid>
                    <Grid item xs={contentSize}>
                        <TopMenu />
                    </Grid>
                </Grid>
            </div>
            <div>
                <Grid container sx={cssContent}>
                    <Grid item sx={cssSideMenu} xs={menuSize}>
                        <SideMenu />
                    </Grid>
                    <Grid item xs={contentSize}>
                        {children}
                    </Grid>
                </Grid>
            </div>
        </>
    )
}

export default SideMenuLayout;