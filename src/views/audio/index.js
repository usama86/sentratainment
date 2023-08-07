// material-ui
// import { Typography } from '@mui/material';

// project imports
import { useState } from 'react';
import BoxComponent from 'ui-component/BoxComponent';
import ButtonComponent from 'ui-component/ButtonComponent';
import FormDialog from 'ui-component/Dialog';
import TextFieldComponent from 'ui-component/TextField';
import MainCard from 'ui-component/cards/MainCard';
import Table from 'ui-component/table';
import CircularProgress from '@mui/material/CircularProgress';
import { fetchAudioData } from 'utils/api';
import { useEffect } from 'react';
import TypographyComponent from 'ui-component/TypographyComponent';
import { formatDate } from 'utils/utilFunction';

// ==============================|| SAMPLE PAGE ||============================== //

const AudioPage = () => {
  const [openAddAudio, setOpenAddAudio] = useState(false);
  const [loading, setLoading] = useState(true);
  const [audio, setAudio] = useState({
    id: 1,
    firstName: '',
    lastName: '',
    email: '',
    password: ''
    // platform,
  });

  const column = [
    {
      accessorKey: 'videoLibraryId', //access nested data with dot notation
      header: 'Video Library ID',
      size: 150
    },
    {
      accessorKey: 'title',
      header: 'Title',
      size: 150
    },
    {
      accessorKey: 'views', //normal accessorKey
      header: 'Views',
      size: 200
    },
    {
      accessorKey: 'dateUploaded',
      header: 'Date Uploaded',
      size: 150,
      Cell: ({ renderedCellValue }) => (
        <TypographyComponent
          sx={{
            letterSpacing: '0em',
            fontWeight: '400',
            lineHeight: '1.5em',
            color: '#364152',
            fontFamily: "'Roboto',sans-serif",
            fontSize: '0.875rem',
            verticalAlign: 'inherit',
            textAlign: 'left',
            cursor: 'inherit',
            overflow: 'hidden',
            padding: '1rem',
            textOverflow: 'ellipsis',
            whiteSpace: 'normal',
            zIndex: '0',
            backgroundColor: 'inherit',
            backgroundImage: 'inherit',
            display: 'table-cell',
            opacity: '1',
            WebkitTransition: 'padding 150ms ease-in-out',
            transition: 'padding 150ms ease-in-out',
            minWidth: 'max(calc(var(--col-title-size) * 1px), 40px)',
            width: 'calc(var(--col-title-size) * 1px)'
          }}
        >
          {formatDate(renderedCellValue)}
        </TypographyComponent>
      )
    },
    {
      accessorKey: 'category',
      header: 'Category',
      size: 150
    }
  ];

  const onChangeAudio = (value, type) => {
    const copyAudios = { ...audio };
    copyAudios[type] = value;
    setAudio(copyAudios);
  };

  useEffect(() => {
    fetchDataAsync();
  }, []);

  const fetchDataAsync = async () => {
    try {
      const responseData = await fetchAudioData(1, 10);
      console.log(responseData);
      // setAudio(responseData.Items);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainCard title="Audio">
      {loading ? (
        <BoxComponent sx={{ display: 'flex' }}>
          <CircularProgress />
        </BoxComponent>
      ) : (
        <Table
          column={column}
          data={audio}
          renderTopToolbarCustomActions={({ table }) => {
            console.log(table);
            return (
              <ButtonComponent
                sx={{ width: '120px', border: '1px solid grey', borderRadius: '8px', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 5px' }}
                onClick={() => setOpenAddAudio(true)}
              >
                Add Audio
              </ButtonComponent>
            );
          }}
        />
      )}

      <FormDialog open={openAddAudio} title="Add Audio" handleClose={() => setOpenAddMovie(false)} subTitle="Add new Audio here">
        <BoxComponent sx={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <TextFieldComponent
            value={`${audio.firstName} `}
            Label="First Name"
            onChange={(e) => onChangeAudio(e.target.value, 'firstName')}
          />
          <TextFieldComponent value={`${audio.lastName}`} Label="Last Name" onChange={(e) => onChangeAudio(e.target.value, 'lastName')} />
          <TextFieldComponent value={`${audio.email}`} Label="Email" onChange={(e) => onChangeAudio(e.target.value, 'email')} />
          <TextFieldComponent
            value={`${audio.password}`}
            Label="Password"
            type="password"
            onChange={(e) => onChangeAudio(e.target.value, 'password')}
          />
        </BoxComponent>
      </FormDialog>
    </MainCard>
  );
};

export default AudioPage;
