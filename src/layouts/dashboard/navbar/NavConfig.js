// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Label from '../../../components/Label';
import SvgIconStyle from '../../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name) => <SvgIconStyle src={`/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  user: getIcon('ic_user'),
  kanban: getIcon('ic_kanban'),
  banking: getIcon('ic_banking'),
  booking: getIcon('ic_booking'),
  invoice: getIcon('ic_invoice'),
  calendar: getIcon('ic_calendar'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
};

const navConfig = [
  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'management',
    items: [
      // USER
      {
        title: 'User',
        path: PATH_DASHBOARD.user.root,
        icon: ICONS.user,
        children: [
          { title: 'list', path: PATH_DASHBOARD.user.list },
          { title: 'create', path: PATH_DASHBOARD.user.new },
          // { title: 'edit', path: PATH_DASHBOARD.user.edit },
        ],
      },
      {
        title: 'Publiction',
        path: PATH_DASHBOARD.publication.root,
        icon: ICONS.blog,
        children: [
          { title: 'list', path: PATH_DASHBOARD.publication.list },
          { title: 'create', path: PATH_DASHBOARD.publication.new },
          // { title: 'edit', path: PATH_DASHBOARD.user.edit },
        ],
      },
      {
        title: 'Research',
        path: PATH_DASHBOARD.research.root,
        icon: ICONS.blog,
        children: [
          { title: 'list', path: PATH_DASHBOARD.research.list },
          { title: 'create', path: PATH_DASHBOARD.research.new },
          // { title: 'edit', path: PATH_DASHBOARD.user.edit },
        ],
      },
      
      {
        title: 'Facility',
        path: PATH_DASHBOARD.facility.root,
        icon: ICONS.booking,
        children: [
          { title: 'list', path: PATH_DASHBOARD.facility.list },
          { title: 'create', path: PATH_DASHBOARD.facility.new },
          // { title: 'edit', path: PATH_DASHBOARD.user.edit },
        ],
      },
      {
        title: 'News',
        path: PATH_DASHBOARD.news.root,
        icon: ICONS.booking,
        children: [
          { title: 'list', path: PATH_DASHBOARD.news.list },
          { title: 'create', path: PATH_DASHBOARD.news.new },
          // { title: 'edit', path: PATH_DASHBOARD.user.edit },
        ],
      },
      {
        title: 'Drive',
        path: PATH_DASHBOARD.drive.root,
        icon: ICONS.booking,
        children: [
          { title: 'list', path: PATH_DASHBOARD.drive.list },
          { title: 'create', path: PATH_DASHBOARD.drive.new },
          // { title: 'edit', path: PATH_DASHBOARD.user.edit },
        ],
      },
    ],
  },
];

export default navConfig;
