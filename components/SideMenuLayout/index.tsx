import { Box, createTheme, Grid, Stack } from "@mui/material";
import { PropsWithChildren } from "react";
import SideMenu from "@/components/SideMenuLayout/SideMenu";
import TopMenu from "@/components/SideMenuLayout/TopMenu";
import themeSelector from "@/styles/themeSelector";

const theme = createTheme(themeSelector());

const SideMenuLayout: any = ({ children }: PropsWithChildren<{}>) => {
    return (
        <Box>
            <TopMenu />
            <Stack direction="row" spacing={2}>
                <SideMenu />
                <Box flex={4}>
                    {children}
                </Box>
            </Stack>
        </Box>
    )
}

export default SideMenuLayout;