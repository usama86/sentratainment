// assets
import { IconDashboard, IconMovie, IconHeadset, IconSalad, IconUser, IconShoppingCart } from '@tabler/icons';

// constant
const icons = { IconDashboard, IconMovie, IconHeadset, IconSalad, IconUser, IconShoppingCart };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: 'dashboard',
  title: 'Dashboard',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard/',
      icon: icons.IconDashboard,
      breadcrumbs: false
    },
    // {
    //   id: 'movies',
    //   title: 'Movies',
    //   type: 'item',
    //   url: '/dashboard/movies',
    //   icon: icons.IconMovie,
    //   breadcrumbs: false
    // },
    {
      id: 'media',
      title: 'Media',
      type: 'item',
      url: '/dashboard/media',
      icon: icons.IconMovie,
      breadcrumbs: false
    },
    {
      id: 'food',
      title: 'Food',
      type: 'item',
      url: '/dashboard/food',
      icon: icons.IconSalad,
      breadcrumbs: false
    },
    {
      id: 'user',
      title: 'User',
      type: 'item',
      url: '/dashboard/user',
      icon: icons.IconUser,
      breadcrumbs: false
    },
    {
      id: 'order',
      title: 'Orders',
      type: 'item',
      url: '/dashboard/order',
      icon: icons.IconShoppingCart,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
