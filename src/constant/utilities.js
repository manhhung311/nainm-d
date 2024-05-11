import { RoleId } from './role';

export const TypeCollection = {
  Research: 0,
  Publication: 1,
  Facility: 2,
  News: 3,
};

export const defaultUserOptions = {
  id: 0,
  fullName: 'Chọn Người Dùng',
};

export const defaultUserOptionsENG = {
  id: 0,
  fullName: 'Select User',
};

export const Publication = {
  Research: 0,
  Publication: 1,
  Facility: 2,
  News: 3,
};
export const StatusCollection = {
  Public: 1,
  Draft: 0,
  Hidden: 2,
};

export const StatusCollectionName = {
  Public: 'Công bố',
  Draft: 'Chờ duyệt',
  Hidden: 'Ẩn',
};

export const Language = {
  VietNam: 'vi',
  English: 'en',
};

export const changeStatusFromId = (id) => {
  switch (id) {
    case StatusCollection.Public:
      return StatusCollectionName.Public;
    case StatusCollection.Draft:
      return StatusCollectionName.Draft;
    case StatusCollection.Hidden:
      return StatusCollectionName.Hidden;
    default:
      return '';
  }
};
