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

// ==============================|| SAMPLE PAGE ||============================== //

const User = () => {
  const [openAddUser, setOpenAddUser] = useState(false);
  const [user, setUser] = useState({
    id: 1,
    firstName: '',
    lastName: '',
    email: '',
    password: ''
    // platform,
  });

  const onChangeUser = (value, type) => {
    const copyUser = { ...user };
    copyUser[type] = value;
    setUser(copyUser);
  };
  return (
    <MainCard title="Users">
      <Table
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
    </MainCard>
  );
};

export default User;




