import { useRef, useState } from 'react';


import {
  Box,
  Button,
  Divider,
  Hidden,
  lighten,
  Popover,
  Typography
} from '@mui/material';

import { styled } from '@mui/material/styles';
import {
  ExpandMoreTwoTone,
  LockOpenTwoTone,
} from '@mui/icons-material';
import Router from 'next/router';

const UserBoxButton = styled(Button)(
  ({ theme }) => `
        padding-left: ${theme.spacing(1)};
        padding-right: ${theme.spacing(1)};
`
);

const MenuUserBox = styled(Box)(
  ({ theme }) => `
        background: ${theme.colors.alpha.black[5]};
        padding: ${theme.spacing(2)};
`
);

const UserBoxText = styled(Box)(
  ({ theme }) => `
        text-align: left;
        padding-left: ${theme.spacing(1)};
`
);

const UserBoxLabel = styled(Typography)(
  ({ theme }) => `
        font-weight: ${theme.typography.fontWeightBold};
        color: ${theme.palette.secondary.main};
        display: block;
`
);

const UserBoxDescription = styled(Typography)(
  ({ theme }) => `
        color: ${lighten(theme.palette.secondary.main, 0.5)}
`
);

function HeaderUserbox() {
  const user = {
    name: 'Catherine Pike',
    avatar: '/static/images/avatars/1.jpg',
    email: 'pike@test.com'
  };

  const ref = useRef<any>(null);
  const [isOpen, setOpen] = useState<boolean>(false);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const handleLogoff = (): void => {
    window.localStorage.removeItem('access_token');
    window.localStorage.removeItem('refresh_token');
    Router.push('/auth/login');
  }

  return (
    <>
      <UserBoxButton color="secondary" ref={ref} onClick={handleOpen}>
        {/* <Avatar variant="rounded" alt={user.name} src={user.avatar} /> */}
        <Hidden mdDown>
          <UserBoxText>
            <UserBoxLabel variant="body1">{user.name}</UserBoxLabel>
            <UserBoxDescription variant="body2">
              {user.email}
            </UserBoxDescription>
          </UserBoxText>
        </Hidden>
        <Hidden smDown>
          <ExpandMoreTwoTone sx={{ ml: 1 }} />
        </Hidden>
      </UserBoxButton>
      <Popover
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <MenuUserBox sx={{ minWidth: 150 }} display="flex">
          {/* <Avatar variant="rounded" alt={user.name} src={user.avatar} /> */}
          <UserBoxText>
            <UserBoxLabel variant="body1">{user.name}</UserBoxLabel>
            <UserBoxDescription variant="body2">
              {user.email}
            </UserBoxDescription>
          </UserBoxText>
        </MenuUserBox>
        {/* <Divider sx={{ mb: 0 }} />
        <List sx={{ p: 1 }} component="nav">
          <NextLink href="#" passHref>
            <ListItem button>
              <AccountBoxTwoToneIcon fontSize="small" />
              <ListItemText primary="Perfil" />
            </ListItem>
          </NextLink>
        </List> */}
        <Divider />
        <Box sx={{ m: 1 }}>
          <Button
            color="primary"
            fullWidth
            onClick={handleLogoff}
          >
            <LockOpenTwoTone sx={{ mr: 1 }} />
            Sair
          </Button>
        </Box>
      </Popover>
    </>
  );
}

export default HeaderUserbox;
