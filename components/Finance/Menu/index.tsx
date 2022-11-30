import { AccountBalanceWallet, Api, Payments, Person } from "@mui/icons-material";
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from "@mui/material";
import Router from "next/router";

const Menu = () => {
    return (
        <List subheader={
            <ListSubheader component="div">
                Financeiro
            </ListSubheader>
        }>
            <ListItem disablePadding>
                <ListItemButton onClick={() => Router.push('/finance/transactions')}>
                    <ListItemIcon>
                        <Payments />
                    </ListItemIcon>
                    <ListItemText>Lançamentos</ListItemText>
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton onClick={() => Router.push('/finance/wallets')}>
                    <ListItemIcon>
                        <AccountBalanceWallet />
                    </ListItemIcon>
                    <ListItemText>Carteiras</ListItemText>
                </ListItemButton>
            </ListItem>
        </List>
    );
}

export default Menu;
