import { Fragment, useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";

import { Avatar, List, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, Typography } from "@mui/material";
import { ExitToApp } from "@mui/icons-material";


const UserMenu = () => {
    const { data } = useSession();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [avatar, setAvatar] = useState('');

    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogoff = (): void => {
        signOut();
    }

    useEffect(() => {
        setName(`${data?.user?.name}`);
        setEmail(`${data?.user?.email}`);
        setAvatar(`${data?.user?.image}`);
    }, []);

    return (
        <>
            <List>
                <ListItem>
                    <ListItemButton
                        sx={{ padding: 0 }}
                        onClick={handleClick}
                    >
                        <ListItemAvatar>
                            <Avatar src={avatar} sx={{ marginLeft: 1 }}></Avatar>
                        </ListItemAvatar>
                        <ListItemText sx={{ display: { xs: "none", sm: "block" } }}
                            primary={name}
                            secondary={
                                <Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        color="#ccc"
                                    >{email}</Typography>
                                </Fragment>
                            }
                        />
                    </ListItemButton>
                </ListItem>
            </List>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
            >
                <MenuItem onClick={handleLogoff}>
                    <ListItemIcon>
                        <ExitToApp fontSize="small" />
                    </ListItemIcon>
                    Sair
                </MenuItem>
            </Menu>
        </>
    )
}

export default UserMenu;