import Router from "next/router";
import { useEffect, useState } from "react";
import {
    Box,
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

import DateHelper from "@/helpers/Date";

import FinanceService from "@/services/FinanceService";

const List = () => {
    const [rows, setRows] = useState([]);
    const [selectedRows, setSelectedRows] = useState([] as any);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const [filterDate, setFilterDate] = useState(new Date());

    const columns: GridColDef[] = [
        { field: "date", headerName: "Data", width: 200 },
        { field: "description", headerName: "Descrição", width: 400 },
        { field: "userId", headerName: "Usuário", width: 200 },
        { field: "walletId", headerName: "Carteira", width: 200 },
        { field: "amount", headerName: "Valor", width: 200 }
    ];

    const handleDelete = async () => {
        // selectedRows.map(async (row: any) => {
        //     await FinanceService.transactions.delete(row);
        //     setRows(await (await FinanceService.transactions.get()).json());
        // });
        setDeleteDialogOpen(false);
    }

    const handleMonth = async (monthCount: number) => {
        setFilterDate(currentDate => DateHelper.AddMonths(currentDate, monthCount))
        console.log(filterDate);
    }

    useEffect(() => {
        (async () => {
            setRows(await (await FinanceService.transactions.get()).json());
        })();
    }, []);

    return (
        <>
            <Stack paddingY={2} spacing={2}>
                <Stack direction="row" spacing={2}>
                    <Box flex={1}></Box>
                    <Box flex={2} textAlign="center">
                        <ButtonGroup variant="contained">
                            <Button onClick={() => handleMonth(-1)}>&lt;</Button>
                            <Button>{DateHelper.GetMonthName(filterDate.getMonth())}/{filterDate.getFullYear()}</Button>
                            <Button onClick={() => handleMonth(1)}>&gt;</Button>
                        </ButtonGroup>
                    </Box>
                    <Box flex={1}></Box>
                </Stack>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={100}
                    rowsPerPageOptions={[100]}
                    getRowId={(row) => row._id}
                    autoHeight
                    localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
                />
            </Stack>
            <Dialog open={deleteDialogOpen}>
                <DialogTitle>Deletar usuário</DialogTitle>
                <DialogContent>
                    <p>Tem certeza que deseja deletar {selectedRows.length > 1 && "estas transações" || "esta transação"}:</p>
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