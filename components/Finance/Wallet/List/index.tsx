import Router from "next/router";
import { useEffect, useState } from "react";
import {
    Avatar,
    Button, ButtonGroup, Dialog, DialogActions, DialogContent, DialogTitle, ListItem, ListItemAvatar, ListItemText, Stack, Tooltip, Typography,
} from "@mui/material";
import {
    DataGrid,
    GridColDef,
    GridRenderCellParams,
    ptBR,
} from '@mui/x-data-grid';
import {
    AccountBalance,
    Add,
    Assessment,
    CreditCard,
    Edit,
    ImportExport,
    Remove,
    Savings
} from "@mui/icons-material";
import { randomUUID } from "crypto";

const List = () => {
    const [rows, setRows] = useState([]);
    const [selectedRows, setSelectedRows] = useState([] as any);
    const [importDialogOpen, setDeleteDialogOpen] = useState(false);

    const typeRender = (params: GridRenderCellParams<string>) => (
        <span className="MuiDataGrid-cellContent">
            {params.value === "bank" && <Tooltip title="Banco"><AccountBalance /></Tooltip>}
            {params.value === "creditcard" && <Tooltip title="Cartão de Crédito"><CreditCard /></Tooltip>}
            {params.value === "saving" && <Tooltip title="Cofrinho"><Savings /></Tooltip>}
        </span>
    );

    const userRender = (params: GridRenderCellParams<{ name: string, email: string, image: string }>) => (
        <ListItem className="MuiDataGrid-cellContent" sx={{ p: 0 }}>
            <ListItemAvatar>
                <Avatar src={`${params.value?.image}`} />
            </ListItemAvatar>
            <ListItemText primary={params.value?.name} secondary={params.value?.email} />
        </ListItem>
    );

    const columns: GridColDef[] = [
        { field: "type", headerName: "Tipo", width: 60, renderCell: typeRender },
        { field: "bankName", headerName: "Banco", minWidth: 200, flex: 1 },
        { field: "user", headerName: "Usuário", minWidth: 300, flex: 1, renderCell: userRender },
        { field: "amount", headerName: "Saldo atual", width: 150 }
    ];

    const handleImportOFX = async (ofxFile: any) => {
        const formData = new FormData();
        formData.append("ofxFile", ofxFile.files[0], ofxFile.files[0].name);
        formData.append("walletId", selectedRows[0]);
        await fetch("/api/finance/ofx/importer", {
            method: "POST",
            body: formData
        });
        setDeleteDialogOpen(false);
    }

    useEffect(() => {
        (async () => {
            const rowsData = await (await fetch("/api/finance/wallets")).json();
            if (!Array.isArray(rowsData)) {
                console.error(`Error: ${rowsData.message}`);
                return;
            }
            const users = await (await fetch("/api/core/users")).json();
            setRows(await Promise.all(rowsData.map(async (row: any) => {
                return {
                    ...row,
                    amount: (10000).toLocaleString("pt-BR", { style: "currency", currency: "BRL" }),
                    user: await users.find((user: any) => user.email === row.user)
                }
            })) as any);
        })();
    }, []);

    return (
        <>
            <Stack paddingY={2} spacing={2}>
                <ButtonGroup variant="outlined">
                    <Button
                        startIcon={<Add />}
                        disabled={selectedRows.length > 0}
                        onClick={() => Router.push("/finance/wallets/add")}
                    >
                        Adicionar
                    </Button>
                    <Button
                        startIcon={<Edit />}
                        disabled={selectedRows.length !== 1}
                        onClick={() => Router.push({
                            pathname: "/finance/wallets/edit",
                            query: { id: selectedRows[0] }
                        })}
                    >
                        Editar
                    </Button>
                    <Button
                        startIcon={<Assessment />}
                        disabled={selectedRows.length !== 1}
                        color="success"
                        onClick={() => Router.push({
                            pathname: "/finance/transactions/list",
                            query: { wallet: selectedRows[0] }
                        })}
                    >
                        Lançamentos desta conta
                    </Button>
                    <Button
                        startIcon={<ImportExport />}
                        disabled={selectedRows.length !== 1}
                        onClick={() => setDeleteDialogOpen(true)}
                    >
                        Importar OFX
                    </Button>
                </ButtonGroup>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    getRowId={(row) => row._id}
                    initialState={{ sorting: { sortModel: [{ field: 'bank', sort: 'asc' }] } }}
                    checkboxSelection
                    autoHeight
                    onSelectionModelChange={(selectedRows) => setSelectedRows(selectedRows)}
                    localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
                />
            </Stack>
            <Dialog open={importDialogOpen}>
                <DialogTitle>Importar OFX</DialogTitle>
                <DialogContent>
                    <Button variant="contained" component="label">
                        Adicionar arquivo OFX
                        <input hidden type="file" />
                    </Button>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={() => setDeleteDialogOpen(false)}>Cancelar</Button>
                    <Button variant="contained" color="success" onClick={() => handleImportOFX(document.querySelector('input[type="file"]'))}>Importar</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default List;