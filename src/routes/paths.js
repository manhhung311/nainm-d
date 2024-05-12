// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  verify: path(ROOTS_AUTH, '/verify'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
};

export const PATH_PAGE = {
  comingSoon: '/coming-soon',
  auth: '/auth',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page404: '/404',
  page500: '/500',
  components: '/components',
  people: '/people',

  drive: {
    list: '/drive',
    detail: (id) => `${id}/detail`,
  },
  publication: {
    list: '/publication',
    detail: (id) => `${id}/detail`,
  },
  research: {
    list: '/research',
    detail: (id) => `${id}/detail`,
  },
  facility: {
    list: '/facility',
    detail: (id) => `${id}/detail`,
  },
  news: {
    list: `/news`,
    detail: (id) => `${id}/detail`,
  },

  profile: {
    list: 'profile',
    detail: (id) => `${id}/detail`,
  },

  dashboard: {
    root: ROOTS_DASHBOARD,
    user: {
      root: `${ROOTS_DASHBOARD}/user`,
      new: `${ROOTS_DASHBOARD}/user/new`,
      list: `${ROOTS_DASHBOARD}/user/list`,
      profile: `${ROOTS_DASHBOARD}/user/profile`,
      account: `${ROOTS_DASHBOARD}/user/account`,
      edit: (id) => `${ROOTS_DASHBOARD}/user/${id}/edit`,
      frofile: (id) => `${ROOTS_DASHBOARD}/user/${id}/frofile`,
    },
  },
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  user: {
    root: '/dashboard/user',
    new: '/dashboard/user/new',
    list: '/dashboard/user/list',
    edit: (id) => `${ROOTS_DASHBOARD}/user/${id}/edit`,
    profile: `${ROOTS_DASHBOARD}/user/profile`,

    // edit: (name) => `dashboard/user/${name}/edit`,
  },
  publication: {
    root: '/dashboard/publication',
    new: '/dashboard/publication/new',
    list: '/dashboard/publication/list',
    edit: (id) => `/dashboard/publication/${id}/edit`,
    // edit: (name) => `dashboard/user/${name}/edit`,
    detail: (id) => `/dashboard/publication/${id}/detail`,
  },
  research: {
    root: '/dashboard/research',
    new: '/dashboard/research/new',
    list: '/dashboard/research/list',
    detail: (id) => `/dashboard/research/${id}/detail`,
    edit: (id) => `/dashboard/research/${id}/edit`,
  },
  facility: {
    root: '/dashboard/facility',
    new: '/dashboard/facility/new',
    list: '/dashboard/facility/list',
    detail: (id) => `/dashboard/facility/${id}/detail`,
    edit: (id) => `/dashboard/facility/${id}/edit`,
  },
  news: {
    root: '/dashboard/news',
    new: '/dashboard/news/new',
    list: '/dashboard/news/list',
    edit: (id) => `/dashboard/news/${id}/edit`,
    detail: (id) => `/dashboard/news/${id}/detail`,
  },
  drive: {
    root: '/dashboard/drive',
    new: '/dashboard/drive/new',
    list: '/dashboard/drive/list',
    edit: (id) => `/dashboard/drive/${id}/edit`,
  },
  profile: {
    root: '/dashboard/profile',
    new: '/dashboard/profile/new',
    list: '/dashboard/profile/list',
    edit: (id) => `/dashboard/profile/${id}/edit`,
    detail: (id) => `/dashboard/profile/${id}/detail`,
  },
};

export const PATH_AFTER_LOGIN = PATH_DASHBOARD.user.root; // as '/dashboard'
