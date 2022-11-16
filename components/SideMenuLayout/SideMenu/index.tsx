import { Home } from "@mui/icons-material";
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import Router from "next/router";

import CoreMenu from '@/components/Core/Menu';

const SideMenu = () => {
    return (
        <Box>
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
            <CoreMenu />
        </Box>
    )
}

export default SideMenu;