import { AppProps } from 'next/app';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { EmotionCache } from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from '@/styles/createEmotionCache';
import Loader from '@/components/SessionLogin';
import themeSelector from '@/styles/themeSelector';

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}
const clientSideEmotionCache = createEmotionCache();

const theme = createTheme(themeSelector());

const MyApp: React.FunctionComponent<MyAppProps> = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Loader />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
};

export default MyApp;