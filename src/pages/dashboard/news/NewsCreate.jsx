// @mui
import { styled } from '@mui/material/styles';
// components
import React, { useEffect, useState } from 'react';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/client';
import { useLocation, useParams } from 'react-router-dom';
import Page from '../../../components/Page';
import NewsNewPostForm from '../../../sections/@dashboard/news/NewsPostForm';
import useLocales from '../../../locals/useLocals';
import { PATH_DASHBOARD } from '../../../routes/paths';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
// ----------------------------------------------------------------------
const RootStyle = styled('div')(() => ({
  height: '100%',
}));
// ----------------------------------------------------------------------
const DETAIL_COLLECTION = loader('../../../graphql/queries/collections/DetailCollection.graphql');

export default function NewsCreate() {
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
    <Page title={t('news.page')}>
      <RootStyle>
        <HeaderBreadcrumbs
          heading={t('create.createNewPost')}
          links={[
            { name: t('user.Management'), href: PATH_DASHBOARD.root },
            { name: t('news.title'), href: PATH_DASHBOARD.news.root },
            { name: t('navItem.create') },
          ]}
        />
        <NewsNewPostForm isEdit={isEdit} dataPostUpdate={postUpdate} />
      </RootStyle>
    </Page>
  );
}
