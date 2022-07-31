import { ReactElement, useEffect } from 'react';
import {
  Box,
  CircularProgress
} from '@mui/material';

import BaseLayout from '@/layouts/BaseLayout';
import Router from 'next/router';

const LoadingPage = () => {
  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    fetch(`${process.env.CORE_API}/auth/token`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(res => {
      if (res.status === 200) {
        Router.push('/dashboard');
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

LoadingPage.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};