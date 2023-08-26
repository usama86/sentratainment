import React, { useCallback, useMemo, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert
} from '@mui/material';
import { Delete, Edit, ShoppingCart } from '@mui/icons-material';
// import { data, states } from './makeData';
import { styles } from 'views/styles';
import { formatDate } from 'utils/utilFunction';
import { addUserApi, deleteUserApi, editUserApi, getAllUser, getUserOrder } from 'utils/api';
import TypographyComponent from 'ui-component/TypographyComponent';
import { useEffect } from 'react';
import FormDialog from 'ui-component/Dialog';
import BoxComponent from 'ui-component/BoxComponent';
import Table from 'ui-component/table';

const UserPage = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  const [openOrders, setOpenOrders] = useState(false);
  const [orderData, setOrderData] = useState([]);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [message, setMessage] = useState('');

  const getUser = async () => {
    const userData = await getAllUser();
    setTableData(userData);
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleCreateNewRow = (res) => {
    setOpenSnackBar(true);
    setMessage(res);
    getUser();
  };

  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    if (!Object.keys(validationErrors).length) {
      tableData[row.index] = values;
      //send/receive api updates here, then refetch or update local table data for re-render
      const data = {
        firstName: values && values.firstName ? values.firstName : row.original.name.split(' ')[0],
        lastName: values && values.lastName ? values.lastName : row.original.name.split(' ')[1],
        phone: {
          value: values['phone.value'],
          countryCode: values['phone.countryCode']
        }
      };

      const message = await editUserApi(data, row.original._id);
      if (message === 'S-07') {
        setMessage('Successfully Updated');
        setOpenSnackBar(true);
        exitEditingMode(); //required to exit editing mode and close modal
        getUser();
      } else {
        setMessage('Unable to update User.');
        setOpenSnackBar(true);
      }
    }
  };

  const handleCancelRowEdits = () => {
    setValidationErrors({});
  };

  const handleDeleteRow = useCallback(
    async (row) => {
      if (!confirm(`Are you sure you want to delete ${row.original.name}`)) {
        return;
      }
      //send api delete request here, then refetch or update local table data for re-render
      const message = await deleteUserApi(row.original._id);

      if (message === 'S-12') {
        setMessage('Successfully deleted user');
        setOpenSnackBar(true);
        getUser();
      } else {
        setMessage('Unable to delete User.');
        setOpenSnackBar(true);
      }

      //isDeleted
      //   tableData.splice(row.index, 1);
      //   setTableData([...tableData]);
    },
    [tableData]
  );

  const handleShowOrderRow = useCallback(
    async (row) => {
      console.log(row.original._id);
      const orderD = await getUserOrder(row.original._id);
      setOrderData(orderD);
      setOpenOrders(true);
      //send api delete request here, then refetch or update local table data for re-render
      //   tableData.splice(row.index, 1);
      //   setTableData([...tableData]);
    },
    [tableData]
  );

  const getCommonEditTextFieldProps = useCallback(
    (cell) => {
      return {
        error: !!validationErrors[cell.id],
        helperText: validationErrors[cell.id],
        onBlur: (event) => {
          const isValid =
            cell.column.id === 'email'
              ? validateEmail(event.target.value)
              : cell.column.id === 'age'
              ? validateAge(+event.target.value)
              : validateRequired(event.target.value);
          if (!isValid) {
            //set validation error for cell if invalid
            setValidationErrors({
              ...validationErrors,
              [cell.id]: `${cell.column.columnDef.header} is required`
            });
          } else {
            //remove validation error for cell if valid
            delete validationErrors[cell.id];
            setValidationErrors({
              ...validationErrors
            });
          }
        }
      };
    },
    [validationErrors]
  );

  const columns = useMemo(
    () => [
      //   {
      //     accessorKey: '_id',
      //     header: 'ID',
      //     enableColumnOrdering: false,
      //     enableEditing: false, //disable editing on this column
      //     enableSorting: false,
      //     size: 80
      //   },
      {
        // accessorKey: 'name',
        header: 'firstName',
        size: 140,
        Cell: ({ row }) => <TypographyComponent sx={styles.textStyle}>{row.original.name.split(' ')[0]}</TypographyComponent>,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          defaultValue: cell.row.original.name.split(' ')[0]
        })
      },
      {
        // accessorKey: 'name',
        header: 'lastName',
        size: 140,
        Cell: ({ row }) => <TypographyComponent sx={styles.textStyle}>{row.original.name.split(' ')[1]}</TypographyComponent>,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          defaultValue: cell.row.original.name.split(' ')[1]
        })
      },
      {
        accessorKey: 'email',
        header: 'Email',
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: 'email'
        }),
        enableEditing: false
      },
      {
        accessorKey: 'phone.countryCode',
        header: 'Phone Code',
        size: 80,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell)
        })
      },
      {
        accessorKey: 'phone.value',
        header: 'Phone',
        size: 80,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell)
        })
      },

      {
        accessorKey: 'type',
        header: 'User Type',
        size: 80,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell)
        }),
        enableEditing: false
      },
      {
        accessorKey: 'createdAt',
        header: 'Created At',
        size: 80,
        Cell: ({ renderedCellValue }) => <TypographyComponent sx={styles.textStyle}>{formatDate(renderedCellValue)}</TypographyComponent>,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell)
        }),
        enableEditing: false
      }
    ],
    [getCommonEditTextFieldProps]
  );
  const getColumnOrder = () => {
    const column = [
      {
        accessorKey: 'title', //access nested data with dot notation
        header: 'Title',
        size: 150
      },
      {
        accessorKey: 'totalPrice',
        header: 'Total Price',
        size: 150
      },
      {
        accessorKey: 'seatNo', //normal accessorKey
        header: 'Seat No',
        size: 200
      },
      {
        accessorKey: 'paymentStatus',
        header: 'Payment Status',
        size: 150
      },
      {
        accessorKey: 'specialRequest',
        header: 'Special Request',
        size: 150
      },
      {
        accessorKey: 'createdAt',
        header: 'Created At',
        size: 150,
        Cell: ({ renderedCellValue }) => <TypographyComponent sx={styles.textStyle}>{formatDate(renderedCellValue)}</TypographyComponent>
      }
    ];
    return column;
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackBar(false);
  };

  return (
    <>
      <MaterialReactTable
        displayColumnDefOptions={{
          'mrt-row-actions': {
            muiTableHeadCellProps: {
              align: 'center'
            },
            size: 120
          }
        }}
        columns={columns}
        data={tableData}
        editingMode="modal" //default
        enableColumnOrdering
        enableEditing
        onEditingRowSave={handleSaveRowEdits}
        onEditingRowCancel={handleCancelRowEdits}
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: 'flex', gap: '1rem' }}>
            <Tooltip arrow placement="left" title="Edit">
              <IconButton onClick={() => table.setEditingRow(row)}>
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip arrow placement="top" title="Show Order">
              <IconButton onClick={() => handleShowOrderRow(row)}>
                <ShoppingCart />
              </IconButton>
            </Tooltip>
            <Tooltip arrow placement="right" title="Delete">
              <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                <Delete />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        renderTopToolbarCustomActions={() => (
          <Button color="secondary" onClick={() => setCreateModalOpen(true)} variant="contained">
            Create New Account
          </Button>
        )}
      />
      <FormDialog open={openOrders} title="Orders" handleClose={() => setOpenOrders(false)}>
        <BoxComponent sx={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <Table data={orderData} column={getColumnOrder()} />
        </BoxComponent>
      </FormDialog>
      <CreateNewAccountModal
        columns={columns}
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateNewRow}
      />
      <Snackbar open={openSnackBar} autoHideDuration={2000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={
            message === 'You registered successfully.' || message === 'Successfully Updated' || message === 'Successfully deleted user'
              ? 'success'
              : 'error'
          }
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

//example of creating a mui dialog modal for creating new rows
// ... (existing imports and code)

export const CreateNewAccountModal = ({ open, onClose, onSubmit }) => {
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    platform: 'Web',
    phone: {
      value: '',
      countryCode: ''
    },
    type: { value: 'user' }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'phone.value' || name === 'phone.countryCode') {
      setValues((prevValues) => ({
        ...prevValues,
        phone: {
          ...prevValues.phone,
          [name.split('.')[1]]: value
        }
      }));
    } else if (name === 'type.value') {
      setValues((prevValues) => ({
        ...prevValues,
        type: {
          ...prevValues.type,
          value: value
        }
      }));
    } else {
      setValues((prevValues) => ({
        ...prevValues,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const value = { ...values };
    value.type = values.type.value;
    const res = await addUserApi(value);
    console.log(res);
    onSubmit(res);
    if (res === 'You registered successfully.') {
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle textAlign="center">Create New Account</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Stack
            sx={{
              width: '100%',
              minWidth: { xs: '300px', sm: '360px', md: '400px' },
              gap: '1.5rem'
            }}
          >
            {Object.keys(values).map(
              (key) =>
                key !== 'platform' &&
                key !== 'type' &&
                key !== 'phone' && ( // Exclude 'platform', 'type', and 'phone' fields
                  <TextField key={key} label={key} name={key} onChange={handleChange} value={values[key]} />
                )
            )}
            <TextField label="Phone Value" name="phone.value" onChange={handleChange} value={values.phone.value} />
            <TextField label="Phone Country Code" name="phone.countryCode" onChange={handleChange} value={values.phone.countryCode} />
            <FormControl variant="outlined">
              <InputLabel htmlFor="type">Type</InputLabel>
              <Select label="Type" name="type.value" onChange={handleChange} value={values.type.value}>
                <MenuItem value="user">User</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: '1.25rem' }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="secondary" onClick={handleSubmit} variant="contained">
          Create New Account
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const validateRequired = (value) => !!value.length;
const validateEmail = (email) =>
  !!email.length &&
  email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
const validateAge = (age) => age >= 18 && age <= 50;

export default UserPage;
