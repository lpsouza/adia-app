import { AppProps } from 'next/app';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { EmotionCache } from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { SessionProvider } from "next-auth/react";
import createEmotionCache from '@/styles/createEmotionCache';
import themeSelector from '@/styles/themeSelector';

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  expires: string;
  pageProps: {
    session: any;
  };
}

const clientSideEmotionCache = createEmotionCache();

const theme = createTheme(themeSelector());

const MyApp: React.FunctionComponent<MyAppProps> = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SessionProvider session={pageProps.session}>
          <Component {...pageProps} />
        </SessionProvider>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default MyApp;