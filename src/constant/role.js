export const RoleArr = [
  'Tất cả',
  'Giám đốc',
  'Admin',
  'Quản lý',
  'Kế toán',
  'Bán hàng',
  'Quản lý phương tiện',
  'Lái xe',
  'Phụ xe',
];

export const Role = {
  admin: 'Admin',
  manager: 'Manager',
  user: 'User',
};
export const RoleId = {
  admin: 0,
  manager: 1,
  user: 2,
};

export const TypeUser = {
  professor: 0,
  member: 1,
  oldMember: 2,
  cooperator: 3,
};

export const TypeUserName = {
  professor: 'PROCCEFER',
  member: 'Student',
  oldMember: 'oldMember',
  cooperator: 'cooperator',
};

export const RoleNumberList = {
  director: 999,
  admin: 99,
  manager: 9,
  accountant: 5,
  sales: 1,
  transporterManager: 2,
  driver: 3,
  assistantDriver: 4,
};

export const VietnameseRoleName = {
  director: 'Giám Đốc',
  admin: 'Admin',
  manager: 'Quản lý',
  accountant: 'Kế toán',
  sales: 'Kinh doanh',
  transporterManager: 'Điều vận',
  driver: 'Lái xe',
  assistantDriver: 'Phụ xe',
};
export const roleChangeNumber = (roleType) => {
  switch (roleType) {
    case RoleId.admin:
      return Role.admin;
    case RoleId.manager:
      return Role.manager;
    case RoleId.user:
      return Role.user;
    default:
      return '';
  }
};

export const typeUserChangeNumber = (id) => {
  switch (id) {
    case TypeUser.professor:
      return TypeUserName.professor;
    case TypeUser.member:
      return TypeUserName.member;
    case TypeUser.oldMember:
      return TypeUserName.oldMember;
    case TypeUser.cooperator:
      return TypeUserName.cooperator;
    default:
      return '';
  }
};
