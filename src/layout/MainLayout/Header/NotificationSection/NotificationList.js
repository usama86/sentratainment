// material-ui
import { useTheme, styled } from '@mui/material/styles';
import {
  Avatar,
  // Chip,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  // ListItemSecondaryAction,
  ListItemText,
  Typography
} from '@mui/material';

// assets

import React from 'react';
import { formatedTime } from 'utils/utilFunction';
// import { formatedTime } from 'utils/utilFunction';

// styles
const ListItemWrapper = styled('div')(({ theme }) => ({
  cursor: 'pointer',
  padding: 16,
  '&:hover': {
    background: theme.palette.primary.light
  },
  '& .MuiListItem-root': {
    padding: 0
  }
}));

// ==============================|| NOTIFICATION LIST ITEM ||============================== //

const NotificationList = ({ notifications }) => {
  const theme = useTheme();

  // const chipSX = {
  //   height: 24,
  //   padding: '0 6px'
  // };
  // const chipErrorSX = {
  //   ...chipSX,
  //   color: theme.palette.orange.dark,
  //   backgroundColor: theme.palette.orange.light,
  //   marginRight: '5px'
  // };

  // const chipWarningSX = {
  //   ...chipSX,
  //   color: theme.palette.warning.dark,
  //   backgroundColor: theme.palette.warning.light
  // };

  return (
    <List
      sx={{
        width: '100%',
        maxWidth: 330,
        py: 0,
        borderRadius: '10px',
        [theme.breakpoints.down('md')]: {
          maxWidth: 300
        },
        '& .MuiListItemSecondaryAction-root': {
          top: 22
        },
        '& .MuiDivider-root': {
          my: 0
        },
        '& .list-container': {
          pl: 7
        }
      }}
    >
      {notifications.map((data) => (
        <React.Fragment key={data?.id}>
          <ListItemWrapper>
            <ListItem alignItems="center">
              <ListItemAvatar>
                <Avatar>{data?.title.charAt(0)}</Avatar>
              </ListItemAvatar>
              <ListItemText primary={data?.title} />
            </ListItem>
            <Grid container direction="column" className="list-container">
              <Grid item xs={12} sx={{}}>
                <Typography variant="caption" display="block" gutterBottom>
                  {formatedTime(data?.timestamp)}
                </Typography>
              </Grid>
              <Grid item xs={12} sx={{ pb: 2 }}>
                <Typography variant="subtitle2">
                  {data?.user} with Seat no {data?.seatNo} Order
                </Typography>
              </Grid>
              {/* <Grid item xs={12}>
                <Grid container>
                  <Grid item>
                    <Chip label="Unread" sx={chipErrorSX} />
                  </Grid>
                  <Grid item>
                    <Chip label="New" sx={chipWarningSX} />
                  </Grid>
                </Grid>
              </Grid> */}
            </Grid>
          </ListItemWrapper>
          <Divider />
        </React.Fragment>
      ))}
    </List>
  );
};

export default NotificationList;
