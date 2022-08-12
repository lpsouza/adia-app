import { Home, Person } from "@mui/icons-material";
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import Router from "next/router";

const SideMenu = () => {
    return (
        <>
            <List>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => Router.push('/')}>
                        <Home sx={{ marginRight: 1 }} />
                        Inicial
                    </ListItemButton>
                </ListItem>
            </List>
            <Typography sx={{ paddingLeft: 2, paddingTop: 2 }}>Gerenciamento</Typography>
            <List>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => Router.push('/core/users')}>
                        <Person sx={{ marginRight: 1 }} />
                        Usuários
                    </ListItemButton>
                </ListItem>
            </List>
        </>
    )
}

export default SideMenu;