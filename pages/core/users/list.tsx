import { ReactElement, useEffect, useState } from "react";
import Head from "next/head";
import {
  Box, Button, ButtonGroup, Card, CardContent, Stack,
} from "@mui/material";
import {
  DataGrid,
  GridColDef
} from '@mui/x-data-grid';
import {
  Add,
  Edit,
  Remove
} from "@mui/icons-material";

import Router from "next/router";
import CoreService from "@/services/CoreService";
import SideMenuLayout from "@/components/SideMenuLayout";

const UsersListPage = () => {
  const [rows, setRows] = useState([]);
  const [selectedRows, setSelectedRows] = useState([] as any);

  const columns: GridColDef[] = [
    { field: "name", headerName: "Nome completo", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "role", headerName: "Função", width: 150 }
  ];

  useEffect(() => {
    (async () => {
      setRows(await CoreService.users.get());
    })();
  }, []);

  return (
    <SideMenuLayout>
      <Head>
        <title>Usuários</title>
      </Head>
      <Box
        sx={{
          padding: 2,
        }}
      >
        <Card>
          <CardContent>
            <Stack spacing={2}>
              <ButtonGroup variant="contained">
                <Button
                  startIcon={<Add />}
                  onClick={() => Router.push("/core/users/add")}
                >
                  Adicionar
                </Button>
                <Button
                  startIcon={<Edit />}
                  disabled={selectedRows.length !== 1}
                >
                  Editar
                </Button>
                <Button
                  startIcon={<Remove />}
                  disabled={selectedRows.length === 0}
                  color="error"
                >
                  Deletar
                </Button>
              </ButtonGroup>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                getRowId={(row) => row.email}
                checkboxSelection
                autoHeight
                onSelectionModelChange={(selectedRows) => setSelectedRows(selectedRows)}
              />
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </SideMenuLayout>
  );
}

export default UsersListPage;
