import CoreService from "@/services/CoreService";
import themeSelector from "@/styles/themeSelector";
import { Box, createTheme, keyframes, styled } from "@mui/material";
import Router from "next/router";
import { useEffect, useState } from "react";

const theme = createTheme(themeSelector());

const SpinAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoadingScreen = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${theme.palette.background.default};
  z-index: 100;
`;

const Loading = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 5px solid ${theme.palette.grey[800]};
  border-top: 5px solid ${theme.palette.primary.main};
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${SpinAnimation} 1.5s linear infinite;
`;

const Loader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const accessToken = window.localStorage.getItem('access_token');
      const refreshToken = window.localStorage.getItem('refresh_token');
      const res = await CoreService.auth.token(accessToken || "");
      if (res.status === 200) {
        const data = await res.json();
        window.localStorage.setItem('email', data.email);
        window.localStorage.setItem('name', data.name);
      } else {
        const res = await CoreService.auth.refresh(refreshToken || "");
        if (res.status === 200) {
          const token = await res.json();
          window.localStorage.setItem('access_token', token.access);
          window.localStorage.setItem('refresh_token', token.refresh);
          await Router.push('/');
        }
        const excludePages = ['/auth/login', '/auth/register', '/404']
        if (!excludePages.includes(Router.pathname)) {
          await Router.push('/auth/login');
        }
      }
      setLoading(false);
    })();
  }, [])
  return (
    <>
      {loading && <LoadingScreen><Loading /></LoadingScreen>}
    </>
  );
}

export default Loader;
