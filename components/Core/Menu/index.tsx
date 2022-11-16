import { Api, Person } from "@mui/icons-material";
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from "@mui/material";
import Router from "next/router";

const Menu = () => {
    return (
        <List subheader={
            <ListSubheader component="div">
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
    );
}

export default Menu;
