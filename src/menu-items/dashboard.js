// assets
import { IconDashboard, IconMovie, IconHeadset, IconSalad, IconUser } from '@tabler/icons';

// constant
const icons = { IconDashboard, IconMovie, IconHeadset, IconSalad, IconUser };

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
    {
      id: 'movies',
      title: 'Movies',
      type: 'item',
      url: '/dashboard/movies',
      icon: icons.IconMovie,
      breadcrumbs: false
    },
    {
      id: 'audio',
      title: 'Audio',
      type: 'item',
      url: '/dashboard/audio',
      icon: icons.IconHeadset,
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
    }
  ]
};

export default dashboard;
