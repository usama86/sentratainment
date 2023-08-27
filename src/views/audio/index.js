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
  // CircularProgress
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
// import { data, states } from './makeData';
import { styles } from 'views/styles';
import { formatDate } from 'utils/utilFunction';
import { addMedia, deleteMedia, editMedia, getAllMedia } from 'utils/api';
import TypographyComponent from 'ui-component/TypographyComponent';
import { useEffect } from 'react';
import { movieGenre, musicGenre } from 'utils/JsonCostant';
import CloudinaryUploadWidget from 'ui-component/CloudinaryUpload';
// import BoxComponent from 'ui-component/BoxComponent';

const getGenre = (values) => {
  if (values?.type === 'music') return musicGenre;
  if (values?.type === 'video') return movieGenre;

  return [...movieGenre, ...musicGenre];
};

const Media = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [message, setMessage] = useState('');

  // const [simpleType, setSimpleType] = useState([]);

  const [typeData] = useState(['music', 'video']);

  const getMediaData = async () => {
    const mediaData = await getAllMedia();
    setTableData(mediaData);
  };

  useEffect(() => {
    getMediaData();
  }, []);

  const handleCreateNewRow = (res) => {
    setOpenSnackBar(true);
    setMessage(res);
    getMediaData();
  };

  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    if (!Object.keys(validationErrors).length) {
      tableData[row.index] = values;
      //send/receive api updates here, then refetch or update local table data for re-render
      // const data = {
      //   title: values.title,
      //   price: {
      //     value: values['price.value'],
      //     currency: values['price.currency']
      //   },
      //   quantity: values.quantity,
      //   type: values.type
      // };
      const data = {
        musicInfo: {
          singerName: values['musicInfo.singerName'],
          albumName: values['musicInfo.albumName']
        },
        title: values.title,
        description: values.description,
        genre: values.genre,
        type: values.type,
        mediaLink: values.mediaLink,
        ImgLink: values.ImgLink,
        category: values.category,
        isActivated: true
      };
      console.log(data);

      const message = await editMedia(row.original._id, data);
      if (message === 'S-19') {
        setMessage('Successfully Updated');
        setOpenSnackBar(true);
        exitEditingMode(); //required to exit editing mode and close modal
        getMediaData();
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
      const message = await deleteMedia(row.original._id);

      if (message === 'S-20') {
        setMessage('Successfully deleted Media');
        setOpenSnackBar(true);
        getMediaData();
      } else {
        setMessage('Unable to delete Media.');
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
        header: 'Name',
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell)
        })
      },
      {
        accessorKey: 'description',
        header: 'description',
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell)
        })
        // enableEditing: false
      },
      {
        accessorKey: 'genre',
        header: 'Genre',
        size: 80,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell)
        }),

        editVariant: 'select',
        editSelectOptions: getGenre()
        // enableEditing: false
      },
      {
        accessorKey: 'type',
        header: 'Media Type',
        size: 80,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell)
        }),
        editVariant: 'select',
        editSelectOptions: ['music', 'video']
        // enableEditing: false
      },
      {
        accessorKey: 'category',
        header: 'Category',
        size: 80,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell)
        }),
        editVariant: 'select',
        editSelectOptions: ['Most Watched', 'Featured']

        // enableEditing: false
      },
      {
        // accessorFn: (row) => `${row?.price?.value} ${row?.price?.currency}`,
        accessorKey: 'musicInfo.singerName',
        header: 'Singer Name',
        size: 80,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell)
        })
      },
      {
        // accessorFn: (row) => `${row?.price?.value} ${row?.price?.currency}`,
        accessorKey: 'musicInfo.albumName',
        header: 'Album Name',
        size: 80,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell)
        })
      },
      {
        accessorKey: 'totalRating',
        header: 'Rating',
        size: 80,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell)
        }),

        enableEditing: false
      },
      {
        accessorKey: 'ImgLink',
        header: 'Image Link',
        size: 80,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell)
        })

        // enableEditing: false
      },
      {
        accessorKey: 'mediaLink',
        header: 'Media Link',
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
    [getCommonEditTextFieldProps]
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
            Add New Media
          </Button>
        )}
      />
      <CreateNewMediaModal
        columns={columns}
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateNewRow}
        typeData={typeData}
      />
      <Snackbar open={openSnackBar} autoHideDuration={2000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={
            message === 'Media created successfully.' || message === 'Successfully Updated' || message === 'Successfully deleted Media'
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

export const CreateNewMediaModal = ({ open, onClose, typeData, onSubmit }) => {
  //onSubmit
  const [values, setValues] = useState({
    musicInfo: {
      singerName: '',
      albumName: ''
    },
    title: '',
    description: '',
    genre: '',
    type: '',
    mediaLink: '',
    ImgLink: '',
    category: '',
    isActivated: true
  });

  // const [mediaType, setMediaType] = useState('');

  const [openSnackBar, setOpenSnackBar] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes('.')) {
      const [parentKey, childKey] = name.split('.');
      setValues((prevValues) => ({
        ...prevValues,
        [parentKey]: {
          ...prevValues[parentKey],
          [childKey]: value
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

    const res = await addMedia(value);
    console.log(res);
    onSubmit(res);
    if (res === 'Media created successfully.') {
      onClose();
    }
  };

  const onUploadSuccess = (result, type) => {
    console.log(result);
    const value = { ...values };
    value[type] = result?.info?.secure_url;
    setValues(value);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle textAlign="center">Add New Media</DialogTitle>
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
                key !== 'musicInfo' &&
                key !== 'type' &&
                key !== 'isActivated' &&
                key !== 'musicInfo.singerName' &&
                key !== 'genre' &&
                key !== 'category' &&
                key !== 'ImgLink' &&
                key !== 'mediaLink' && (
                  <TextField key={key} label={key} name={key} type={'text'} onChange={handleChange} value={values[key]} />
                )
            )}
            <TextField label="Singer Name" name="musicInfo.singerName" onChange={handleChange} value={values.musicInfo.singerName} />
            <TextField label="Album Name" name="musicInfo.albumName" onChange={handleChange} value={values.musicInfo.albumName} />
            <FormControl variant="outlined">
              <InputLabel htmlFor="type">Type</InputLabel>
              <Select label="Type" name="type" onChange={handleChange} value={values.type}>
                {typeData.map((item, index) => (
                  <MenuItem value={item} key={index}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl variant="outlined">
              <InputLabel htmlFor="genre">Genre</InputLabel>
              <Select label="Genre" name="genre" onChange={handleChange} value={values.genre}>
                {getGenre(values).map((item, index) => (
                  <MenuItem value={item} key={index}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl variant="outlined">
              <InputLabel htmlFor="category">Category</InputLabel>
              <Select label="Category" name="category" onChange={handleChange} value={values.category}>
                {['Most Watched', 'Featured'].map((item, index) => (
                  <MenuItem value={item} key={index}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </form>
        <CloudinaryUploadWidget onUploadSuccess={(e) => onUploadSuccess(e, 'ImgLink')} text="Upload Thubmnail" />
        <CloudinaryUploadWidget onUploadSuccess={(e) => onUploadSuccess(e, 'mediaLink')} text="Upload Video/Audio" />
      </DialogContent>
      <DialogActions sx={{ p: '1.25rem' }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="secondary" onClick={handleSubmit} variant="contained">
          Add new Media
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
export default Media;
