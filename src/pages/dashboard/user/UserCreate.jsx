import { useQuery } from '@apollo/client';
import { Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { loader } from 'graphql.macro';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { _userList } from '../../../_mock/_user';
import Page from '../../../components/Page';
import NewUser from '../../../sections/user/NewUser';

const GET_USER_INFO = loader('../../../graphql/mutations/users/userById.graphql');

const RootStyle = styled('div')(() => ({
  height: '100%',
}));

export default function UserCreate() {
  const { pathname } = useLocation(); // đọc đường dẫn pathname là cái đường dẫn
  const [currentUser, setCurrentUser] = useState({});
  const { id } = useParams(); // để đọc cái id trên thanh công cụ
  const isEdit = pathname.includes('edit'); // nếu đường dẫn đó có chữ edit thì isEdit bằng true thì là vào trang edit
  const { data: allGetUser } = useQuery(GET_USER_INFO, {
    variables: {
      id: Number(id),
    },
  });
  useEffect(() => {
    if (allGetUser) {
      setCurrentUser(allGetUser.user);
    }
  }, [allGetUser]);

  const currentGetIdUser = id ? currentUser : null;

  return (
    <>
      <Page title={isEdit ? 'Cập nhật người dùng' : 'Tạo mới người dùng'}>
        <Grid item xs={12} md={12} sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex', py: 5 }}>
          <Typography variant="h4">{isEdit ? 'Cập nhật người dùng' : 'Tạo mới người dùng'}</Typography>
        </Grid>
        <NewUser isEdit={isEdit} currentUser={currentGetIdUser} /> {/* và cuối cùng nếu có id thì truyền xuống đây */}
      </Page>
    </>
  );
}
