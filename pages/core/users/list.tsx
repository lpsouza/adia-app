import { useEffect, useState } from "react";
import Head from "next/head";
import {
  Box, Button, ButtonGroup, Card, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, Stack,
} from "@mui/material";
import {
  DataGrid,
  GridColDef,
  ptBR,
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
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const columns: GridColDef[] = [
    { field: "name", headerName: "Nome completo", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "role", headerName: "Função", width: 150 }
  ];

  const handleDelete = async () => {
    selectedRows.map(async (row: any) => {
      await CoreService.users.delete(row);
    });
    setRows(await (await CoreService.users.get()).json());
    setDeleteDialogOpen(false);
  }

  useEffect(() => {
    (async () => {
      setRows(await (await CoreService.users.get()).json());
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
        <Stack paddingY={2} spacing={2}>
          <ButtonGroup variant="outlined">
            <Button
              startIcon={<Add />}
              disabled={selectedRows.length > 0}
              onClick={() => Router.push("/core/users/add")}
            >
              Adicionar
            </Button>
            <Button
              startIcon={<Edit />}
              disabled={selectedRows.length !== 1}
              onClick={() => Router.push({
                pathname: "/core/users/edit",
                query: { email: selectedRows[0] }
              })}
            >
              Editar
            </Button>
            <Button
              startIcon={<Remove />}
              disabled={selectedRows.length === 0}
              color="error"
              onClick={() => setDeleteDialogOpen(true)}
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
            isRowSelectable={(param) => param.row.role !== "owner"}
            autoHeight
            onSelectionModelChange={(selectedRows) => setSelectedRows(selectedRows)}
            localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
          />
        </Stack>
      </Box>
      <Dialog open={deleteDialogOpen}>
        <DialogTitle>Deletar usuário</DialogTitle>
        <DialogContent>
          <p>Tem certeza que deseja deletar {selectedRows.length > 1 && "estes usuários" || "este usuário"}:</p>
          <ul>
            {selectedRows.map((row: any) => (
              <li key={row}>{rows.filter((r: any) => r.email === row)[0]['name']}</li>
            ))}
          </ul>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => setDeleteDialogOpen(false)}>Cancelar</Button>
          <Button variant="contained" color="error" onClick={() => handleDelete()}>Deletar</Button>
        </DialogActions>
      </Dialog>
    </SideMenuLayout>
  );
}

export default UsersListPage;
