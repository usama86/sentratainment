// material-ui
// import { Typography } from '@mui/material';

// project imports

import { useState, useEffect } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import Table from 'ui-component/table';
import { getAllFood } from 'utils/api';

// ==============================|| SAMPLE PAGE ||============================== //

const Food = () => {
  const [data, setData] = useState([]);
  const getFood = async () => {
    const foodData = await getAllFood();
    setData(foodData);
  };

  useEffect(() => {
    getFood();
  }, []);

  const getColumn = () => {
    const column = [
      {
        accessorKey: 'title',
        header: 'Name',
        size: 150
      },
      {
        // accessorKey: 'name', //access nested data with dot notation
        accessorFn: (row) => `${row?.price?.value} ${row?.price?.currency}`,
        header: 'Price',
        size: 150
      },
      {
        accessorKey: 'quantity', //normal accessorKey
        header: 'Quantity',
        size: 200
      },
      {
        accessorKey: 'type',
        header: 'Type',
        size: 150
      },
      {
        accessorKey: 'createdAt',
        header: 'Created At',
        size: 150
      }
    ];
    return column;
  };
  return (
    <MainCard title="Foods">
      <Table column={getColumn()} data={data} />
    </MainCard>
  );
};

export default Food;
