// material-ui
// import { Typography } from '@mui/material';

// project imports
import { useState } from 'react';
import BoxComponent from 'ui-component/BoxComponent';
import ButtonComponent from 'ui-component/ButtonComponent';
import FormDialog from 'ui-component/Dialog';
import MainCard from 'ui-component/cards/MainCard';
import Table from 'ui-component/table';
import CircularProgress from '@mui/material/CircularProgress';
import { fetchVideoData } from 'utils/api';
import { useEffect } from 'react';
import TypographyComponent from 'ui-component/TypographyComponent';
import { formatDate } from 'utils/utilFunction';
import AddMovie from './AddMovie';
import { styles } from 'views/styles';

// ==============================|| SAMPLE PAGE ||============================== //

const Movies = () => {
  const [openAddMovie, setOpenAddMovie] = useState(false);
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState({
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
      Cell: ({ renderedCellValue }) => <TypographyComponent sx={styles.textStyle}>{formatDate(renderedCellValue)}</TypographyComponent>
    },
    {
      accessorKey: 'category',
      header: 'Category',
      size: 150
    }
  ];

  // const onChangeMovie = (value, type) => {
  //   const copyMovies = { ...movies };
  //   copyMovies[type] = value;
  //   setMovies(copyMovies);
  // };

  useEffect(() => {
    fetchDataAsync();
  }, []);

  const fetchDataAsync = async () => {
    try {
      const responseData = await fetchVideoData(1, 10);
      console.log(responseData);
      setMovies(responseData.items);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainCard title="Movies">
      {loading ? (
        <BoxComponent sx={{ display: 'flex' }}>
          <CircularProgress />
        </BoxComponent>
      ) : (
        <Table
          column={column}
          data={movies}
          renderTopToolbarCustomActions={({ table }) => {
            console.log(table);
            return (
              <ButtonComponent
                sx={{ width: '120px', border: '1px solid grey', borderRadius: '8px', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 5px' }}
                onClick={() => setOpenAddMovie(true)}
              >
                Add Movies
              </ButtonComponent>
            );
          }}
        />
      )}

      <FormDialog open={openAddMovie} title="Add Movies" handleClose={() => setOpenAddMovie(false)} subTitle="Add new movie here">
        <AddMovie />
      </FormDialog>
    </MainCard>
  );
};

export default Movies;
