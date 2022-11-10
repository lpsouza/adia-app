import Logo from "@/components/Logo";
import { Menu } from "@mui/icons-material";
import { AppBar, Box, Drawer, Grid, IconButton, styled, Toolbar } from "@mui/material";
import { useState } from "react";
import SideMenu from "../SideMenu";
import UserMenu from "./UserMenu";

const ToolbarFlex = styled(Toolbar)({
    display: "flex",
    justifyContent: "space-between"
})

const TopMenu = () => {
    const drawerWidth = 240;
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <>
            <AppBar position="sticky">
                <ToolbarFlex>
                    <IconButton sx={{ display: { xs: "block", sm: "none" } }} onClick={handleDrawerToggle}>
                        <Menu />
                    </IconButton>
                    <Logo />
                    <UserMenu />
                </ToolbarFlex>
            </AppBar>
            <Box component="nav">
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    <SideMenu />
                </Drawer>
            </Box>
        </>
    )
}

export default TopMenu;