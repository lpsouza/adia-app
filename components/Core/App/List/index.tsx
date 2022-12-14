import Router from "next/router";
import { useEffect, useState } from "react";
import {
    Button, ButtonGroup, Dialog, DialogActions, DialogContent, DialogTitle, Stack,
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

const List = () => {
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
            await fetch(`/api/core/apps/${row}`, { method: "DELETE" });
            setRows(await fetch("/api/core/apps").then((res) => res.json()));
        });
        setDeleteDialogOpen(false);
    }

    useEffect(() => {
        (async () => {
            setRows(await fetch("/api/core/apps").then((res) => res.json()));
        })();
    }, []);

    return (
        <>
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
                            <li key={row}>{row}</li>
                        ))}
                    </ul>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={() => setDeleteDialogOpen(false)}>Cancelar</Button>
                    <Button variant="contained" color="error" onClick={() => handleDelete()}>Deletar</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default List;