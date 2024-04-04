// routes
import { PATH_AUTH, PATH_PAGE } from '../../routes/paths';
// components
// import { PATH_AFTER_LOGIN } from "../../config";
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
    path: '/people',
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
  
  // {
  //   title: 'Pages',
  //   path: '/pages',
  //   icon: <Iconify icon={'eva:file-fill'} {...ICON_SIZE} />,
  //   children: [
  //     {
  //       subheader: 'Option1',
  //       items: [
  //         { title: 'S1', path: PATH_PAGE.about },
  //         { title: 'S2', path: PATH_PAGE.contact },
  //         { title: 'S3', path: PATH_PAGE.faqs },
  //       ],
  //     },
  //     {
  //       subheader: 'Option2',
  //       items: [
  //         { title: 'S1', path: PATH_AUTH.loginUnprotected },
  //         { title: 'S2', path: PATH_AUTH.registerUnprotected },
  //         { title: 'S3', path: PATH_AUTH.resetPassword },
  //       ],
  //     },
  //     {
  //       subheader: 'Option3',
  //       items: [
  //         { title: 'S1', path: PATH_AUTH.op31 },
  //         { title: 'S2', path: PATH_AUTH.op32 },
  //         { title: 'S3', path: PATH_AUTH.op33 },
  //       ],
  //     },
  //   ],
  // },
];

export default menuConfig;
