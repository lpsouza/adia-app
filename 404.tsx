import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider
} from '@mui/material';

const Error404Page = () => {
  return (
    <Box sx={{
      width: 600,
      height: 100,
      margin: "auto",
    }}>
      <Card>
        <CardHeader title="Erro 404" />
        <Divider />
        <CardContent>
          Página não encontrada.
        </CardContent>
      </Card>
    </Box>
  );
}

export default Error404Page;