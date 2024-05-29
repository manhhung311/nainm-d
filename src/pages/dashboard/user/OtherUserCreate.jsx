import { useQuery } from '@apollo/client';
import { Grid, Typography } from '@mui/material';
import { loader } from 'graphql.macro';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Page from '../../../components/Page';
import useLocales from '../../../locals/useLocals';
import OtherUser from '../../../sections/user/OtherUser';

const GET_USER_INFO = loader('../../../graphql/mutations/users/userById.graphql');

export default function OtherUserCreate() {
  const { t } = useLocales();
  const { pathname } = useLocation(); // đọc đường dẫn pathname là cái đường dẫn
  const [currentUser, setCurrentUser] = useState({});
  const { id } = useParams(); // để đọc cái id trên thanh công cụ
  const isEdit = pathname.includes('otherEdit'); // nếu đường dẫn đó có chữ edit thì isEdit bằng true thì là vào trang edit
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
      <Page title={isEdit ? t('user.pageUpdate') : t('user.pageCreate')}>
        <Grid item xs={12} md={12} sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex', py: 5 }}>
          <Typography variant="h4">{isEdit ? t('user.pageUpdate') : t('user.pageCreate')}</Typography>
        </Grid>
        <OtherUser isEdit={isEdit} currentUser={currentGetIdUser} /> {/* và cuối cùng nếu có id thì truyền xuống đây */}
      </Page>
    </>
  );
}
