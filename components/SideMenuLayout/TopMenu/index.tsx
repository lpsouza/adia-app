import Logo from "@/components/Logo";
import { Menu } from "@mui/icons-material";
import { AppBar, Grid, IconButton, styled, Toolbar } from "@mui/material";
import UserMenu from "./UserMenu";

const ToolbarFlex = styled(Toolbar)({
    display: "flex",
    justifyContent: "space-between"
})

const TopMenu = () => {
    return (
        <AppBar position="sticky">
            <ToolbarFlex>
                <IconButton sx={{ display: { xs: "block", sm: "none" } }}>
                    <Menu />
                </IconButton>
                <Logo />
                <UserMenu />
            </ToolbarFlex>
        </AppBar>
    )
}

export default TopMenu;