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
  Alert,
  CircularProgress
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
// import { data, states } from './makeData';
import { styles } from 'views/styles';
import { formatDate } from 'utils/utilFunction';
import { deleteFoodApi, editFood, getAllFood, getAllTypes, addFoodType, addFood } from 'utils/api';
import TypographyComponent from 'ui-component/TypographyComponent';
import { useEffect } from 'react';
import BoxComponent from 'ui-component/BoxComponent';
import CloudinaryUploadWidget from 'ui-component/CloudinaryUpload';

const FoodPage = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [message, setMessage] = useState('');

  const [simpleType, setSimpleType] = useState([]);

  const [typeData, setTypeData] = useState([]);

  const getFood = async () => {
    const foodData = await getAllFood();
    setTableData(foodData);
  };

  const getType = async () => {
    const returnTypeData = await getAllTypes();

    const data = returnTypeData.map((item) => item.title);
    setSimpleType(data);
    setTypeData(returnTypeData);
  };

  useEffect(() => {
    getFood();
    getType();
  }, []);

  const handleCreateNewRow = (res) => {
    setOpenSnackBar(true);
    setMessage(res);
    getFood();
  };

  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    if (!Object.keys(validationErrors).length) {
      tableData[row.index] = values;
      //send/receive api updates here, then refetch or update local table data for re-render
      const data = {
        title: values.title,
        price: {
          value: values['price.value'],
          currency: values['price.currency']
        },
        quantity: values.quantity,
        type: values.type
      };

      const message = await editFood(row.original._id, data);
      if (message === 'S-04') {
        setMessage('Successfully Updated');
        setOpenSnackBar(true);
        exitEditingMode(); //required to exit editing mode and close modal
        getFood();
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
      if (!confirm(`Are you sure you want to delete ${row.original.title}`)) {
        return;
      }
      //send api delete request here, then refetch or update local table data for re-render
      const message = await deleteFoodApi(row.original._id);

      if (message === 'S-17') {
        setMessage('Successfully deleted Food');
        setOpenSnackBar(true);
        getFood();
      } else {
        setMessage('Unable to delete Food.');
        setOpenSnackBar(true);
      }

      //isDeleted
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
        accessorKey: 'title',
        header: 'title',
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell)
        })
      },
      {
        accessorKey: 'quantity',
        header: 'Quantity',
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: 'quantity'
        })
        // enableEditing: false
      },

      {
        // accessorFn: (row) => `${row?.price?.value} ${row?.price?.currency}`,
        accessorKey: 'price.value',
        header: 'Price',
        size: 80,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell)
        })
      },
      {
        // accessorFn: (row) => `${row?.price?.value} ${row?.price?.currency}`,
        accessorKey: 'price.currency',
        header: 'Currency',
        size: 80,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell)
        })
      },
      {
        accessorKey: 'type',
        header: 'Food Type',
        size: 80,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell)
        }),
        editVariant: 'select',
        editSelectOptions: simpleType
        // enableEditing: false
      },
      {
        accessorKey: 'foodImg',
        header: 'Food Image',
        size: 80,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell)
        })
        // enableEditing: false
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
    [getCommonEditTextFieldProps, simpleType]
  );

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
            <Tooltip arrow placement="right" title="Delete">
              <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                <Delete />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        renderTopToolbarCustomActions={() => (
          <Button color="secondary" onClick={() => setCreateModalOpen(true)} variant="contained">
            Add New Food
          </Button>
        )}
      />
      <CreateNewAccountModal
        columns={columns}
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateNewRow}
        typeData={typeData}
        getType={getType}
      />
      <Snackbar open={openSnackBar} autoHideDuration={2000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={
            message === 'Added Food successfully.' || message === 'Successfully Updated' || message === 'Successfully deleted Food'
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

export const CreateNewAccountModal = ({ open, onClose, typeData, getType, onSubmit }) => {
  //onSubmit
  const [values, setValues] = useState({
    title: '',
    price: {
      value: null,
      currency: 'GBP'
    },
    quantity: null,
    type: '',
    foodImg: ''
  });

  const [foodType, setFoodType] = useState('');
  const [loader, setLoader] = useState(false);

  const [openSnackBar, setOpenSnackBar] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'price.value' || name === 'price.currency') {
      setValues((prevValues) => ({
        ...prevValues,
        price: {
          ...prevValues.price,
          [name.split('.')[1]]: value
        }
      }));
    } else {
      setValues((prevValues) => ({
        ...prevValues,
        [name]: value
      }));
    }
  };

  const addType = async () => {
    setLoader(true);
    const isAdded = await addFoodType({ title: foodType });
    if (isAdded === 'S-14') {
      getType();
      setLoader(false);

      setOpenSnackBar('Type is successfully added');
      setFoodType('');
    } else {
      setLoader(false);
      setOpenSnackBar('Unable to add type');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const value = { ...values };
    console.log(value);
    // value.type = values.type.value;

    // {
    //   "title": "Candy Biscuit",
    //   "price": {
    //     "value": 2.23,
    //     "currency": "USD"
    //   },
    //   "quantity": 10,
    //   "type": "Snacks"
    // }

    const res = await addFood(value);
    console.log(res);
    onSubmit(res);
    if (res === 'Added Food successfully.') {
      onClose();
    }
  };

  const onUploadSuccess = (result) => {
    console.log(result);
    const value = { ...values };
    value.foodImg = result?.info?.secure_url;
    setValues(value);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle textAlign="center">Add New Food</DialogTitle>
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
                key !== 'price' &&
                key !== 'type' &&
                key !== 'foodImg' && ( // Exclude 'platform', 'type', and 'phone' fields
                  <TextField
                    key={key}
                    label={key}
                    name={key}
                    type={key === 'quantity' ? 'number' : 'text'}
                    onChange={handleChange}
                    value={values[key]}
                  />
                )
            )}
            <TextField label="Price" name="price.value" onChange={handleChange} type="number" value={values.price.value} />
            <TextField label="Currency" name="price.currency" onChange={handleChange} value={values.price.currency} />
            <FormControl variant="outlined">
              <InputLabel htmlFor="type">Type</InputLabel>
              <Select label="Type" name="type" onChange={handleChange} value={values.type}>
                {typeData.map((item) => (
                  <MenuItem value={item.title} key={item._id}>
                    {item.title}
                  </MenuItem>
                ))}
              </Select>
              <BoxComponent sx={{ display: 'flex', gap: '20px', pt: '1.5rem' }}>
                <TextField label="Add Type" name="types" onChange={(e) => setFoodType(e.target.value)} value={foodType} />
                <Button sx={{ border: '1px solid grey' }} onClick={addType} disabled={loader ? true : false}>
                  {loader ? <CircularProgress size={20} /> : '+'}
                </Button>
              </BoxComponent>
              <CloudinaryUploadWidget onUploadSuccess={onUploadSuccess} text="Upload Image" id="upload-widget" />
            </FormControl>
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: '1.25rem' }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="secondary" onClick={handleSubmit} variant="contained">
          Add new Food
        </Button>
      </DialogActions>

      <Snackbar
        open={openSnackBar === 'Type is successfully added' ? true : openSnackBar === 'Unable to add type' ? true : false}
        autoHideDuration={2000}
        onClose={() => setOpenSnackBar('')}
      >
        <Alert
          onClose={() => setOpenSnackBar('')}
          severity={openSnackBar === 'Type is successfully added' ? 'success' : openSnackBar === 'Unable to add type' ? 'error' : ''}
          sx={{ width: '100%' }}
        >
          {openSnackBar}
        </Alert>
      </Snackbar>
    </Dialog>
  );
};

const validateRequired = (value) => !!value.length;
export default FoodPage;
