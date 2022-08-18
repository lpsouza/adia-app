import themeSelector from "@/styles/themeSelector";
import { Api, Home, Person } from "@mui/icons-material";
import { Box, createTheme, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import Router from "next/router";

const theme = createTheme(themeSelector());

const cssButtomMenu = { borderRadius: "10px" };

const SideMenu = () => {
    return (
        <Box sx={{ paddingY: theme.spacing(2), paddingX: theme.spacing(3) }}>
            <List>
                <ListItem disablePadding>
                    <ListItemButton sx={cssButtomMenu} onClick={() => Router.push('/')}>
                        <Home sx={{ marginRight: 1 }} />
                        Inicial
                    </ListItemButton>
                </ListItem>
            </List>
            <Typography sx={{ paddingLeft: 2, paddingTop: 2 }}>Gerenciamento</Typography>
            <List>
                <ListItem disablePadding>
                    <ListItemButton sx={cssButtomMenu} onClick={() => Router.push('/core/users')}>
                        <Person sx={{ marginRight: 1 }} />
                        Usuários
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton sx={cssButtomMenu} onClick={() => Router.push('/core/apps')}>
                        <Api sx={{ marginRight: 1 }} />
                        Apps
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    )
}

export default SideMenu;