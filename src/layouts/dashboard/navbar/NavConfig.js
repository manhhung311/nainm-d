// routes
import { userNavConfig, managerNavConfig, adminNavConfig } from './NavbarByRole';
import { RoleId } from '../../../constant';

// ----------------------------------------------------------------------

const commonNavConfig = (user) => {
  switch (user?.role) {
    case RoleId.admin:
      return adminNavConfig;
    case RoleId.manager:
      return managerNavConfig;
    case RoleId.user:
      return userNavConfig;
    default:
      return [];
  }
};

export default commonNavConfig;
