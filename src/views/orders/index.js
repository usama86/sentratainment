// material-ui
// import { Typography } from '@mui/material';

// project imports

import { useState, useEffect } from 'react';
import BoxComponent from 'ui-component/BoxComponent';
import TypographyComponent from 'ui-component/TypographyComponent';
import MainCard from 'ui-component/cards/MainCard';
import Table from 'ui-component/table';
import { getAllOrder } from 'utils/api';
import { formatDateTime } from 'utils/utilFunction';
import { styles } from 'views/styles';

// ==============================|| SAMPLE PAGE ||============================== //

const OrderPage = () => {
  const [data, setData] = useState([]);
  const getOrder = async () => {
    const orderData = await getAllOrder();
    setData(orderData);
  };

  useEffect(() => {
    getOrder();
  }, []);

  const getColumnOrder = () => {
    const column = [
      {
        accessorKey: 'title', //access nested data with dot notation
        header: 'Title',
        size: 150
      },
      {
        accessorKey: 'totalPrice',
        header: 'Total Amount',
        size: 30
      },
      {
        accessorKey: 'userID.name',
        header: 'User Name',
        size: 250
      },
      {
        accessorKey: 'seatNo', //normal accessorKey
        header: 'Seat No',
        size: 50
      },
      {
        accessorKey: 'paymentStatus',
        header: 'Payment Status',
        size: 50
      },
      {
        accessorKey: 'specialRequest',
        header: 'Special Request',
        size: 150
      },
      {
        accessorKey: 'status',
        header: 'Status',
        size: 150
      },
      {
        accessorKey: 'createdAt',
        header: 'Created At',
        size: 150,
        Cell: ({ renderedCellValue }) => (
          <TypographyComponent sx={styles.textStyle}>{formatDateTime(renderedCellValue)}</TypographyComponent>
        )
      }
    ];
    return column;
  };
  return (
    <MainCard title="Orders">
      <Table
        column={getColumnOrder()}
        data={data}
        renderDetailPanel={({ row }) => (
          <BoxComponent sx={{ gap: '12px', display: 'flex', flexDirection: 'column', pl: '20px' }}>
            {row.original.orderItems?.map((data, index) => (
              <BoxComponent key={index} sx={{ gap: '12px', display: 'flex' }}>
                <BoxComponent sx={{ display: 'flex' }}>
                  <BoxComponent sx={{ fontWeight: 'bold', width: '120px' }}>Food Name:</BoxComponent>
                  <BoxComponent sx={{ width: '120px' }}>{data.foodID?.title}</BoxComponent>
                </BoxComponent>
                <BoxComponent sx={{ display: 'flex' }}>
                  <BoxComponent sx={{ fontWeight: 'bold', width: '120px' }}>Food Quantity:</BoxComponent>
                  <BoxComponent sx={{ width: '120px' }}>{data?.quantity}</BoxComponent>
                </BoxComponent>
              </BoxComponent>
            ))}
          </BoxComponent>
        )}
      />
    </MainCard>
  );
};

export default OrderPage;
