import React from 'react';
import { MaterialReactTable } from 'material-react-table';
import PropTypes from 'prop-types';

const Table = ({ data, column, ...otherProps }) => {
  //should be memoized or stable

  return <MaterialReactTable columns={column} data={data} {...otherProps} />;
};

export default Table;

Table.propTypes = {
  data: PropTypes.array,
  column: PropTypes.array
};
Table.defaultProps = {
  data: [
    {
      name: {
        firstName: 'John',
        lastName: 'Doe'
      },
      address: '261 Erdman Ford',
      city: 'East Daphne',
      state: 'Kentucky'
    },
    {
      name: {
        firstName: 'Jane',
        lastName: 'Doe'
      },
      address: '769 Dominic Grove',
      city: 'Columbus',
      state: 'Ohio'
    },
    {
      name: {
        firstName: 'Joe',
        lastName: 'Doe'
      },
      address: '566 Brakus Inlet',
      city: 'South Linda',
      state: 'West Virginia'
    },
    {
      name: {
        firstName: 'Kevin',
        lastName: 'Vandy'
      },
      address: '722 Emie Stream',
      city: 'Lincoln',
      state: 'Nebraska'
    },
    {
      name: {
        firstName: 'Joshua',
        lastName: 'Rolluffs'
      },
      address: '32188 Larkin Turnpike',
      city: 'Charleston',
      state: 'South Carolina'
    }
  ],
  column: [
    {
      accessorKey: 'name.firstName', //access nested data with dot notation
      header: 'First Name',
      size: 150
    },
    {
      accessorKey: 'name.lastName',
      header: 'Last Name',
      size: 150
    },
    {
      accessorKey: 'address', //normal accessorKey
      header: 'Address',
      size: 200
    },
    {
      accessorKey: 'city',
      header: 'City',
      size: 150
    },
    {
      accessorKey: 'state',
      header: 'State',
      size: 150
    }
  ]
};
