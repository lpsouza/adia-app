import Router from "next/router";
import { useEffect, useState } from "react";
import {
    Avatar,
    Box,
    Button, ButtonGroup, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Tooltip,
} from "@mui/material";
import {
    DataGrid,
    GridCellParams,
    GridColDef,
    GridRenderCellParams,
    ptBR,
} from '@mui/x-data-grid';
import {
    Add,
    Edit,
    Remove
} from "@mui/icons-material";

import DateHelper from "@/helpers/Date";
import NumberHelper from "@/helpers/Number";

import FinanceService from "@/services/FinanceService";
import React from "react";
import { clsx } from "clsx";
import md5 from "blueimp-md5";

const List = () => {
    const [rows, setRows] = useState([]);

    const [filterDate, setFilterDate] = useState(new Date());

    const descriptionRender = (params: GridRenderCellParams<string>) => (
        <Tooltip title={<React.Fragment>{params.value}</React.Fragment>} className="MuiDataGrid-cellContent"><span>{params.value}</span></Tooltip>
    );

    const walletUserRender = (params: GridRenderCellParams<string>) => (
        <Avatar src={`https://www.gravatar.com/avatar/${md5(params.value || Math.random().toString())}?d=monsterid`} />
    )

    const amountRender = (params: GridRenderCellParams<number>) => (
        <span className="MuiDataGrid-cellContent">{NumberHelper.CurrencyPtBr(params.value || 0)}</span>
    );

    const amountClassName = (params: GridCellParams<number>) => {
        const amount = params.value || 0;
        return clsx('finance-amount', {
            negative: amount < 0,
            positive: amount > 0,
        })
    };

    const columns: GridColDef[] = [
        { field: "date", headerName: "Data", width: 110 },
        { field: "description", headerName: "Descrição", minWidth: 500, flex: 1, renderCell: descriptionRender },
        { field: "amount", headerName: "Valor", width: 100, align: "right", renderCell: amountRender, cellClassName: amountClassName },
        { field: "walletName", headerName: "Carteira", width: 150 },
        { field: "walletUser", headerName: "Usuário", width: 100, renderCell: walletUserRender }
    ];

    const handleMonth = async (monthCount: number) => {
        setFilterDate(currentDate => DateHelper.AddMonths(currentDate, monthCount));
        const rowsData = await (await FinanceService.transactions.getByDate(filterDate)).json();
        const wallets = await (await FinanceService.wallets.get()).json();
        setRows(rowsData.map((row: any) => {
            const date = new Date(row.date);
            const wallet = wallets.filter((w: any) => w._id === row.walletId)[0] || {};
            return {
                ...row,
                date: DateHelper.DatePtBr(date),
                walletName: wallet.name,
                walletUser: wallet.user
            }
        }));
    }

    useEffect(() => {
        (async () => await handleMonth(0))();
    }, []);

    return (
        <>
            <Stack paddingY={2} spacing={2} sx={{
                '& .finance-amount.positive': {
                    backgroundColor: '#006600'
                },
                '& .finance-amount.negative': {
                    backgroundColor: '#660000'
                }
            }}>
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
                    initialState={{ sorting: { sortModel: [{ field: 'date', sort: 'desc' }] } }}
                    autoHeight
                    localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
                />
            </Stack>
        </>
    );
}

export default List;