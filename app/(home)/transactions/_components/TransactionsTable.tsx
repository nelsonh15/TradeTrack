"use client"
import { useState } from 'react';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  GridRowModes,
  DataGrid,
  GridActionsCellItem,
  GridRowEditStopReasons,
  GridEventListener,
  GridRowId,
  GridRowModesModel,
  GridRowModel,
  GridRowsProp,
  GridColDef,
} from '@mui/x-data-grid';
import { deleteTransactionHandler, editTransactionHandler } from './actions/actions';

interface TransactionsListProps {
  transactions: {
    account_id: string;
    created_at: string;
    created_by: string;
    id: string;
    price: number;
    quantity: number;
    stock_name: string;
    ticker: string;
    transaction_date: string;
    type: string
  }[];
}

function TransactionsTable({ transactions }: TransactionsListProps) {
  const [rows, setRows] = useState(transactions);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    deleteTransactionHandler(id as string);
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = async (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    await editTransactionHandler(updatedRow);
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns: GridColDef[] = [
    { 
      field: 'stock_name', 
      headerName: 'Stock Name', 
      width: 400, 
      align: 'center', 
      headerAlign: 'center', 
      editable: true 
    },
    { 
      field: 'ticker', 
      headerName: 'Ticker', 
      width: 140, 
      align: 'center', 
      headerAlign: 'center', 
      editable: true 
    },
    { 
      field: 'price', 
      headerName: 'Price', 
      width: 140, 
      align: 'center', 
      headerAlign: 'center', 
      editable: true 
    },
    { 
      field: 'quantity', 
      headerName: 'Quantity', 
      width: 140, 
      align: 'center', 
      headerAlign: 'center', 
      editable: true,
      valueGetter: (params: number) => Math.abs(params)
    },
    {
      field: 'transaction_date',
      headerName: 'Transaction Date',
      type: 'date',
      width: 200,
      align: 'center', 
      headerAlign: 'center',
      editable: true,
      valueGetter: (params: string | Date) => new Date(params)
    },
    {
      field: 'type',
      headerName: 'Type',
      width: 200,
      align: 'center', 
      headerAlign: 'center',
      editable: true,
      type: 'singleSelect',
      valueOptions: ['buy', 'sell'],
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 150,
      align: 'center', 
      headerAlign: 'center',
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        height: 600,
        width: '100%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slotProps={{
          toolbar: { setRowModesModel },
        }}
      />
    </Box>
  );
}

export default TransactionsTable;