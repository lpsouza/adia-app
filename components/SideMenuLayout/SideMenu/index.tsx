import themeSelector from "@/styles/themeSelector";
import { Api, Home, Person } from "@mui/icons-material";
import { Box, createTheme, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Typography } from "@mui/material";
import Router from "next/router";

const theme = createTheme(themeSelector());

const cssButtomMenu = { borderRadius: "10px" };

const SideMenu = () => {
    return (
        <Box flex={1} sx={{ display: { xs: "none", sm: "block" } }}>
            <List>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => Router.push('/')}>
                        <ListItemIcon>
                            <Home />
                        </ListItemIcon>
                        <ListItemText>Inicial</ListItemText>
                    </ListItemButton>
                </ListItem>
            </List>
            <List subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    Gerenciamento
                </ListSubheader>
            }>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => Router.push('/core/users')}>
                        <ListItemIcon>
                            <Person />
                        </ListItemIcon>
                        <ListItemText>Usuários</ListItemText>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => Router.push('/core/apps')}>
                        <ListItemIcon>
                            <Api />
                        </ListItemIcon>
                        <ListItemText>Apps</ListItemText>
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    )
}

export default SideMenu;