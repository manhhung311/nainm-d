// @mui
import { styled } from '@mui/material/styles';
// components
import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/client';
import { useLocation, useParams } from 'react-router-dom';
import Page from '../../../components/Page';
import NewsNewPostForm from '../../../sections/@dashboard/news/NewsPostForm';
import useLocales from '../../../locals/useLocals';
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
        <Box>
          <NewsNewPostForm isEdit={isEdit} dataPostUpdate={postUpdate} />
        </Box>
      </RootStyle>
    </Page>
  );
}
