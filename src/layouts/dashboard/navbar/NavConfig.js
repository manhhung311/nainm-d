// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import { SvgColor } from '../../../components/svg-color';

// ----------------------------------------------------------------------

const getIcon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  blog: getIcon('ic_blog'),
  user: getIcon('ic_user'),
  kanban: getIcon('ic_kanban'),
  folder: getIcon('ic_folder'),
  file: getIcon('ic_file'),
  label: getIcon('ic_label'),
  menu: getIcon('ic_menu_item'),
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
        title: 'Publication',
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
        icon: ICONS.label,
        children: [
          { title: 'list', path: PATH_DASHBOARD.research.list },
          { title: 'create', path: PATH_DASHBOARD.research.new },
          // { title: 'edit', path: PATH_DASHBOARD.user.edit },
        ],
      },

      {
        title: 'Facility',
        path: PATH_DASHBOARD.facility.root,
        icon: ICONS.kanban,
        children: [
          { title: 'list', path: PATH_DASHBOARD.facility.list },
          { title: 'create', path: PATH_DASHBOARD.facility.new },
          // { title: 'edit', path: PATH_DASHBOARD.user.edit },
        ],
      },
      {
        title: 'News',
        path: PATH_DASHBOARD.news.root,
        icon: ICONS.file,
        children: [
          { title: 'list', path: PATH_DASHBOARD.news.list },
          { title: 'create', path: PATH_DASHBOARD.news.new },
          // { title: 'edit', path: PATH_DASHBOARD.user.edit },
        ],
      },
      {
        title: 'Drive',
        path: PATH_DASHBOARD.drive.root,
        icon: ICONS.folder,
        children: [
          { title: 'list', path: PATH_DASHBOARD.drive.list },
          { title: 'create', path: PATH_DASHBOARD.drive.new },
          // { title: 'edit', path: PATH_DASHBOARD.user.edit },
        ],
      },
      {
        title: 'People',
        path: PATH_DASHBOARD.drive.root,
        icon: ICONS.menu,
        children: [
          { title: 'list', path: PATH_DASHBOARD.profile.list },
          { title: 'create', path: PATH_DASHBOARD.profile.new },
          // { title: 'edit', path: PATH_DASHBOARD.user.edit },
        ],
      },
    ],
  },
];

export default navConfig;
