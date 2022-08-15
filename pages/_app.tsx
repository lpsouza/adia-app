import { AppProps } from 'next/app';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { EmotionCache } from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from '@/styles/createEmotionCache';
import darkThemeOptions from '@/styles/theme/dark';
import SessionLogin from '@/components/SessionLogin';

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}
const clientSideEmotionCache = createEmotionCache();

const lightTheme = createTheme(darkThemeOptions);

const MyApp: React.FunctionComponent<MyAppProps> = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <SessionLogin />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
};

export default MyApp;