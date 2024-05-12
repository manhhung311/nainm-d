// components
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const ICON_SIZE = {
  width: 22,
  height: 22,
};

const menuConfig = [
  {
    title: 'People',
    icon: <Iconify icon={'eva:home-fill'} {...ICON_SIZE} />,
    path: '/profile',
  },
  {
    title: 'Research',
    icon: <Iconify icon={'eva:home-fill'} {...ICON_SIZE} />,
    path: '/research',
  },
  {
    title: 'Publication',
    icon: <Iconify icon={'eva:home-fill'} {...ICON_SIZE} />,
    path: '/publication',
  },
  {
    title: 'Facility',
    icon: <Iconify icon={'eva:home-fill'} {...ICON_SIZE} />,
    path: '/facility',
  },
  {
    title: 'News',
    icon: <Iconify icon={'eva:home-fill'} {...ICON_SIZE} />,
    path: '/news',
  },
];

export default menuConfig;
