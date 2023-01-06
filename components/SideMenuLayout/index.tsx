import { Box, createTheme, Grid, Stack } from "@mui/material";
import { useSession, signIn, signOut } from "next-auth/react"
import { PropsWithChildren, useEffect } from "react";
import Loader from '@/components/Loader'
import SideMenu from "@/components/SideMenuLayout/SideMenu";
import TopMenu from "@/components/SideMenuLayout/TopMenu";
import themeSelector from "@/styles/themeSelector";

const theme = createTheme(themeSelector());

const SideMenuLayout: any = ({ children }: PropsWithChildren<{}>) => {
    const { status } = useSession()

    if (status === "authenticated") {
        return (
            <Box>
                <TopMenu />
                <Stack direction="row" spacing={2}>
                    <Box flex={1} sx={{ display: { xs: "none", sm: "block" } }}>
                        <SideMenu />
                    </Box>
                    <Box flex={7} sx={{ paddingRight: "20px" }}>
                        {children}
                    </Box>
                </Stack>
            </Box>
        )
    }

    if (status === "unauthenticated") {
        signIn();
    }

    return <Loader />
}

export default SideMenuLayout;