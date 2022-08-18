import SinglePageLayout from '@/components/SinglePageLayout';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider
} from '@mui/material';

const Error404Page = () => {
  return (
    <SinglePageLayout>
      <Box sx={{
        width: 600,
        height: 100,
      }}>
        <Card>
          <CardHeader title="Erro 404" />
          <Divider />
          <CardContent>
            Página não encontrada.
          </CardContent>
        </Card>
      </Box>
    </SinglePageLayout>
  );
}

export default Error404Page;