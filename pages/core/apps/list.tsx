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

const AppsListPage = () => {
  const [rows, setRows] = useState([]);
  const [selectedRows, setSelectedRows] = useState([] as any);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const columns: GridColDef[] = [
    { field: "name", headerName: "Nome", width: 100 },
    { field: "description", headerName: "Descrição", width: 200 },
    { field: "endpoint", headerName: "Endpoint", width: 300 }
  ];

  const handleDelete = async () => {
    selectedRows.map(async (row: any) => {
      await CoreService.apps.delete(row);
    });
    setRows(await (await CoreService.apps.get()).json());
    setDeleteDialogOpen(false);
  }

  useEffect(() => {
    (async () => {
      setRows(await (await CoreService.apps.get()).json());
    })();
  }, []);

  return (
    <SideMenuLayout>
      <Head>
        <title>Apps</title>
      </Head>
      <Stack paddingY={2} spacing={2}>
        <ButtonGroup variant="outlined">
          <Button
            startIcon={<Add />}
            disabled={selectedRows.length > 0}
            onClick={() => Router.push("/core/apps/add")}
          >
            Adicionar
          </Button>
          <Button
            startIcon={<Edit />}
            disabled={selectedRows.length !== 1}
            onClick={() => Router.push({
              pathname: "/core/apps/edit",
              query: { id: selectedRows[0] }
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
          getRowId={(row) => row._id}
          checkboxSelection
          autoHeight
          onSelectionModelChange={(selectedRows) => setSelectedRows(selectedRows)}
          localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
        />
      </Stack>
      <Dialog open={deleteDialogOpen}>
        <DialogTitle>Deletar app</DialogTitle>
        <DialogContent>
          <p>Tem certeza que deseja deletar {selectedRows.length > 1 && "estes apps" || "este app"}:</p>
          <ul>
            {selectedRows.map((row: any) => (
              <li key={row}>{rows.filter((r: any) => r._id === row)[0]['name']}</li>
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

export default AppsListPage;
