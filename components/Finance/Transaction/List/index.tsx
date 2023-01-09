import { useEffect, useState } from "react";
import {
    Avatar,
    Box,
    Button, ButtonGroup, Stack, Tooltip,
} from "@mui/material";
import {
    DataGrid,
    GridCellParams,
    GridColDef,
    GridRenderCellParams,
    ptBR,
} from '@mui/x-data-grid';

import DateHelper from "@/helpers/Date";

import React from "react";
import { clsx } from "clsx";
import { AccountBalance, CreditCard, Savings } from "@mui/icons-material";
import { randomUUID } from "crypto";

const List = ({ idx }: any) => {
    const [rows, setRows] = useState([]);

    const [filterDate, setFilterDate] = useState(new Date());

    const filterWallet = idx ? [{ columnField: 'walletId', operatorValue: 'equals', value: idx }] : [];

    const descriptionRender = (params: GridRenderCellParams<string>) => (
        <Tooltip title={<React.Fragment>{params.value}</React.Fragment>} className="MuiDataGrid-cellContent"><span>{params.value}</span></Tooltip>
    );

    const userRender = (params: GridRenderCellParams<string>) => (
        <Avatar src={`https://www.gravatar.com/avatar/${randomUUID}`} />
    )

    const amountRender = (params: GridRenderCellParams<number>) => (
        <span className="MuiDataGrid-cellContent">{(params.value || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span>
    );

    const walletTypeRender = (params: GridRenderCellParams<string>) => (
        <span className="MuiDataGrid-cellContent">
            {params.value === "bank" && <Tooltip title="Banco"><AccountBalance /></Tooltip>}
            {params.value === "creditcard" && <Tooltip title="Cartão de Crédito"><CreditCard /></Tooltip>}
            {params.value === "saving" && <Tooltip title="Cofrinho"><Savings /></Tooltip>}
        </span>
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
        { field: "walletType", headerName: "Carteira", width: 90, renderCell: walletTypeRender },
        { field: "bank", headerName: "Banco", width: 200 },
        { field: "user", headerName: "Usuário", width: 100, renderCell: userRender },
        { field: "walletId", headerName: "ID da Carteira", width: 100 }
    ];

    const handleMonth = async (monthCount: number) => {
        setFilterDate(currentDate => DateHelper.AddMonths(currentDate, monthCount));
        const rowsData = await fetch(`/api/finance/transactions?date=${filterDate}`).then(res => res.json());
        if (!Array.isArray(rowsData)) {
            console.error(`Error: ${rowsData.message}`);
            return;
        }
        setRows(await Promise.all(rowsData.map(async (row: any) => {
            const date = new Date(row.date);
            const wallet = await (await fetch(`/api/finance/wallets/${row.walletId}`)).json();
            return {
                ...row,
                date: DateHelper.DatePtBr(date),
                walletType: wallet.type,
                user: wallet.user
            }
        })) as any);
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
                    initialState={{
                        sorting: { sortModel: [{ field: 'date', sort: 'desc' }] },
                        filter: { filterModel: { items: filterWallet } },
                        columns: { columnVisibilityModel: { walletId: false } }
                    }}
                    autoHeight
                    localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
                />
            </Stack>
        </>
    );
}

export default List;