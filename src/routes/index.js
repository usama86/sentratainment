import { useRoutes } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
import { useEffect, useState } from 'react';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  const [routeToShow, setRouteToShow] = useState(false);
  useEffect(() => {
    const isUserExist = localStorage.getItem('user');
    if (isUserExist) setRouteToShow(true);
  }, []);
  return useRoutes([routeToShow ? MainRoutes : AuthenticationRoutes]);
}
