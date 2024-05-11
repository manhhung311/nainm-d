// @mui
import { styled } from '@mui/material/styles';
// components
import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/client';
import { useLocation, useParams } from 'react-router-dom';
import Page from '../../../components/Page';

import useLocales from '../../../locals/useLocals';
import ProfessorNewPostForm from '../../../sections/@dashboard/profile/ProfessorNewPostForm';

// ----------------------------------------------------------------------
const RootStyle = styled('div')(() => ({
  height: '100%',
}));
// ----------------------------------------------------------------------

const USER_BY_ID = loader('../../../graphql/mutations/users/userById.graphql');

export default function ProfileCreate() {
  const { pathname } = useLocation();

  const [postUpdate, setPostUpdate] = useState();

  const { id: idNews } = useParams();

  const { data: detailUser } = useQuery(USER_BY_ID, {
    variables: {
      id: 1,
    },
  });

  useEffect(() => {
    if (detailUser) {
      setPostUpdate(detailUser?.user);
    }
  }, [idNews, detailUser]);

  const isEdit = pathname.includes('edit');

  const { t } = useLocales();

  return (
    <Page title={t('profile.page')}>
      <RootStyle>
        <Box>
          <ProfessorNewPostForm isEdit={isEdit} dataPostUpdate={postUpdate} />
        </Box>
      </RootStyle>
    </Page>
  );
}
