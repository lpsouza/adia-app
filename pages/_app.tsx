import { ReactElement, ReactNode, useEffect } from 'react';

import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import nProgress from 'nprogress';
import 'nprogress/nprogress.css';
import ThemeProvider from 'src/theme/ThemeProvider';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import createEmotionCache from 'src/createEmotionCache';
import { SidebarProvider } from 'src/contexts/SidebarContext';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

const clientSideEmotionCache = createEmotionCache();

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface TokyoAppProps extends AppProps {
  emotionCache?: EmotionCache;
  Component: NextPageWithLayout;
}

function TokyoApp(props: TokyoAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const getLayout = Component.getLayout ?? ((page) => page);

  Router.events.on('routeChangeStart', nProgress.start);
  Router.events.on('routeChangeError', nProgress.done);
  Router.events.on('routeChangeComplete', nProgress.done);

  useEffect(() => {
    (async () => {
      const accessToken = window.localStorage.getItem('access_token');
      const refreshToken = window.localStorage.getItem('refresh_token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_CORE_API}/auth/token`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      if (res.status !== 200) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_CORE_API}/auth/token`, {
          method: 'POST',
          headers: { ContentType: 'application/json' },
          body: JSON.stringify({ refreshToken })
        });
        if (res.status === 200) {
          const token = await res.json();
          window.localStorage.setItem('access_token', token.access);
          window.localStorage.setItem('refresh_token', token.refresh);
          Router.push('/');
        }
        if (Router.pathname !== '/auth/login' && Router.pathname !== '/auth/register' && Router.pathname !== '/404') {
          Router.push('/auth/login');
        }
      }
    })();
  }, []);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>A.D.I.A. Frontend</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>
      <SidebarProvider>
        <ThemeProvider>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <CssBaseline />
            {getLayout(<Component {...pageProps} />)}
          </LocalizationProvider>
        </ThemeProvider>
      </SidebarProvider>
    </CacheProvider>
  );
}

export default TokyoApp;
