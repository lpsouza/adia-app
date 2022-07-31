import { useEffect } from 'react';
import {
  Box,
  CircularProgress
} from '@mui/material';

import Router from 'next/router';

const LoadingPage = () => {
  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    fetch('http://localhost:3001/auth/token', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(res => {
      if (res.status === 200) {
        Router.push('/app');
      } else {
        Router.push('/login');
      }
    });
  });

  return (
    <Box sx={{
      width: 100,
      height: 100,
      margin: "auto",
    }}>
      <CircularProgress />
    </Box>
  );
}

export default LoadingPage;