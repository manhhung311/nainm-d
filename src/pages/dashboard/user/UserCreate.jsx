import { styled } from '@mui/material/styles';
import { useLocation, useParams } from 'react-router-dom';

import { _userList } from '../../../_mock/_user';
import Page from '../../../components/Page';
import NewUser from '../../../sections/user/NewUser';

const RootStyle = styled('div')(() => ({
  height: '100%',
}));

export default function UserCreate() {
  const { pathname } = useLocation(); // đọc đường dẫn pathname là cái đường dẫn

  const { id } = useParams(); // để đọc cái id trên thanh công cụ

  const isEdit = pathname.includes('edit'); // nếu đường dẫn đó có chữ edit thì isEdit bằng true thì là vào trang edit

  console.log('_userList', _userList);
  console.log('name', id);
  // Sử dụng paramCase chính xác
  const currentUser = _userList.find((user) => user.id === id); // tìm trong userlist có id nào bằng id paramCase vừa tìm không

  return (
    <Page title="Danh sách người dùng">
      <NewUser isEdit={isEdit} currentUser={currentUser} /> {/** và cuối cùng nếu có id thì truyền xuống đây */}
    </Page>
  );
}
