import themeSelector from "@/styles/themeSelector";
import { Box, createTheme, keyframes, styled } from "@mui/material";
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
  z-index: 999999;
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
  return <LoadingScreen><Loading /></LoadingScreen>;
}

export default Loader;
