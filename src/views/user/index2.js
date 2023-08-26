// material-ui
// import { Typography } from '@mui/material';

// project imports
import { Button } from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
import BoxComponent from 'ui-component/BoxComponent';
import ButtonComponent from 'ui-component/ButtonComponent';
import FormDialog from 'ui-component/Dialog';
import TextFieldComponent from 'ui-component/TextField';
import TypographyComponent from 'ui-component/TypographyComponent';
import MainCard from 'ui-component/cards/MainCard';
import Table from 'ui-component/table';
import { getAllUser, getUserOrder } from 'utils/api';
import { formatDate } from 'utils/utilFunction';
import { styles } from 'views/styles';
// import MoreVertIcon from '@mui/icons-material/MoreVert';

// ==============================|| SAMPLE PAGE ||============================== //

const User = () => {
  const [openAddUser, setOpenAddUser] = useState(false);
  const [openOrders, setOpenOrders] = useState(false);
  const [user, setUser] = useState({
    id: 1,
    firstName: '',
    lastName: '',
    email: '',
    password: ''
    // platform,
  });

  const [data, setData] = useState([]);
  const [orderData, setOrderData] = useState([]);

  const [ID, setID] = useState([]);

  const getUser = async () => {
    const userData = await getAllUser();
    setData(userData);
  };

  useEffect(() => {
    getUser();
  }, []);

  const onChangeUser = (value, type) => {
    const copyUser = { ...user };
    copyUser[type] = value;
    setUser(copyUser);
  };

  const handleClick = async (e, val) => {
    console.log(e);
    const orderD = await getUserOrder(val);
    setOrderData(orderD);
    setID(val);
    setOpenOrders(true);
    console.log(ID);
  };

  const getColumn = () => {
    const column = [
      {
        accessorKey: 'name', //access nested data with dot notation
        header: 'First Name',
        size: 150,
        Cell: ({ renderedCellValue }) => <TypographyComponent sx={styles.textStyle}>{renderedCellValue.split(' ')[0]}</TypographyComponent>
      },
      {
        accessorKey: 'name',
        header: 'Last Name',
        size: 150,
        Cell: ({ renderedCellValue }) => <TypographyComponent sx={styles.textStyle}>{renderedCellValue.split(' ')[1]}</TypographyComponent>
      },
      {
        accessorKey: 'email', //normal accessorKey
        header: 'Email',
        size: 200
      },
      {
        accessorKey: 'phone.value',
        header: 'Phone',
        size: 150
      },
      {
        accessorKey: 'type',
        header: 'User Type',
        size: 150
      },
      {
        accessorKey: 'createdAt',
        header: 'Created At',
        size: 150,
        Cell: ({ renderedCellValue }) => <TypographyComponent sx={styles.textStyle}>{formatDate(renderedCellValue)}</TypographyComponent>
      },
      {
        accessorKey: '_id',
        header: '',
        size: 50,
        Cell: ({ renderedCellValue, row }) => (
          <>
            <Button
              onClick={(e) => handleClick(e, row?._valuesCache?._id, renderedCellValue)} // Pass the row ID to handleClick
            >
              Show Order
            </Button>
          </>
        )
      }
    ];
    return column;
  };

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
  return (
    <MainCard title="Users">
      <Table
        data={data}
        column={getColumn()}
        renderTopToolbarCustomActions={({ table }) => {
          console.log(table);
          return (
            <ButtonComponent
              sx={{ width: '120px', border: '1px solid grey', borderRadius: '8px', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 5px' }}
              onClick={() => setOpenAddUser(true)}
            >
              Add User
            </ButtonComponent>
          );
        }}
      />
      <FormDialog open={openAddUser} title="Add User" handleClose={() => setOpenAddUser(false)} subTitle="Create new user here">
        <BoxComponent sx={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <TextFieldComponent value={`${user.firstName} `} Label="First Name" onChange={(e) => onChangeUser(e.target.value, 'firstName')} />
          <TextFieldComponent value={`${user.lastName}`} Label="Last Name" onChange={(e) => onChangeUser(e.target.value, 'lastName')} />
          <TextFieldComponent value={`${user.email}`} Label="Email" onChange={(e) => onChangeUser(e.target.value, 'email')} />
          <TextFieldComponent
            value={`${user.password}`}
            Label="Password"
            type="password"
            onChange={(e) => onChangeUser(e.target.value, 'password')}
          />
        </BoxComponent>
      </FormDialog>

      <FormDialog open={openOrders} title="Orders" handleClose={() => setOpenOrders(false)}>
        <BoxComponent sx={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <Table data={orderData} column={getColumnOrder()} />
        </BoxComponent>
      </FormDialog>
    </MainCard>
  );
};

export default User;
