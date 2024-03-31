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
  op31: path(ROOTS_AUTH, '/op31'),
  op32: path(ROOTS_AUTH, '/op32'),
  op33: path(ROOTS_AUTH, '/op33'),
};

export const PATH_PAGE = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page404: '/404',
  page500: '/500',
  components: '/components',
  op31: '/op31',
  op32: '/op32',
  op33: '/op33',
  dashboard: {
    root: ROOTS_DASHBOARD,
    user: {
      root: `${ROOTS_DASHBOARD}/user`,
      new: `${ROOTS_DASHBOARD}/user/new`,
      list: `${ROOTS_DASHBOARD}/user/list`,
      profile: `${ROOTS_DASHBOARD}/user/profile`,
      account: `${ROOTS_DASHBOARD}/user/account`,
      edit: (id) => `${ROOTS_DASHBOARD}/user/${id}/edit`,
    },
  },
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  user: {
    root: path(ROOTS_DASHBOARD, '/user'),
    new: path(ROOTS_DASHBOARD, '/user/new'),
    list: path(ROOTS_DASHBOARD, '/user/list'),
    edit: (name) => path(ROOTS_DASHBOARD, `/user/${name}/edit`),
  },
};

export const PATH_AFTER_LOGIN = PATH_PAGE.dashboard.root; // as '/dashboard'
