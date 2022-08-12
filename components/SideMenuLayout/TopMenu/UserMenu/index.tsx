import { Avatar, List, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, Typography } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import md5 from "blueimp-md5";
import { ExitToApp } from "@mui/icons-material";
import Router from "next/router";

const UserMenu = () => {
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
        window.localStorage.clear();
        Router.push('/auth/login');
    }

    useEffect(() => {
        setName(window.localStorage.getItem('name') || 'John Doe');
        setEmail(window.localStorage.getItem('email') || 'john.doe@foobar.com');
        setAvatar(`https://www.gravatar.com/avatar/${md5(window.localStorage.getItem('email') || Math.random().toString())}?d=monsterid`);
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
                        <ListItemText
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