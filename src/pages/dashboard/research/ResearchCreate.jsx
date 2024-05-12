// @mui
import { styled } from '@mui/material/styles';
// components
import React, { useEffect, useState } from 'react';
import { Box, Container } from '@mui/material';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/client';
import { useLocation, useParams } from 'react-router-dom';
import Page from '../../../components/Page';
import ResearchNewPostForm from '../../../sections/@dashboard/research/ResearchNewPostForm';
import useLocales from '../../../locals/useLocals';
import { PATH_DASHBOARD } from '../../../routes/paths';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import useSettings from '../../../hooks/useSettings';
// ----------------------------------------------------------------------
const RootStyle = styled('div')(() => ({
  height: '100%',
}));
// ----------------------------------------------------------------------
const DETAIL_COLLECTION = loader('../../../graphql/queries/collections/DetailCollection.graphql');
export default function ResearchCreate() {
  const { pathname } = useLocation();

  const [postUpdate, setPostUpdate] = useState();

  const { id: idNews } = useParams();

  const { data: detailCollection } = useQuery(DETAIL_COLLECTION, {
    variables: {
      id: idNews,
    },
  });

  useEffect(() => {
    if (detailCollection) {
      setPostUpdate(detailCollection?.collection);
    }
  }, [idNews, detailCollection]);

  const isEdit = pathname.includes('edit');
  const { t } = useLocales();
  return (
    <Page title={t('research.title')}>
      <RootStyle>
        <HeaderBreadcrumbs
          heading={t('create.createNewPost')}
          links={[
            { name: t('user.Management'), href: PATH_DASHBOARD.root },
            { name: t('research.title'), href: PATH_DASHBOARD.research.root },
            { name: t('navItem.create') },
          ]}
        />
        <ResearchNewPostForm isEdit={isEdit} dataPostUpdate={postUpdate} />
      </RootStyle>
    </Page>
  );
}
