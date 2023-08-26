import { useDispatch, useSelector } from 'react-redux';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

// routing
import Routes from 'routes';

// defaultTheme
import themes from 'themes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';
import { useEffect } from 'react';
import { NOTIFCATION_ADD } from 'store/actions';
import { socket } from 'utils/Constant';

// ==============================|| APP ||============================== //

const App = () => {
  const dispatch = useDispatch();

  const customization = useSelector((state) => state.customization);

  useEffect(() => {
    socket.addEventListener('message', (event) => {
      const newNotification = JSON.parse(event.data);
      console.log(newNotification);

      dispatch({ type: NOTIFCATION_ADD, notificationData: newNotification });
    });

    return () => {
      socket.close();
    };
  }, []);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <CssBaseline />
        <NavigationScroll>
          <Routes />
        </NavigationScroll>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
