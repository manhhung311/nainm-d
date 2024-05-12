import React, { useEffect, useState } from 'react';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/client';
import { useLocation, useParams } from 'react-router-dom';
// components
import { styled } from '@mui/material/styles';
import PublicationNewForm from '../../../sections/publication/PublicationNewForm';
import { PATH_DASHBOARD } from '../../../routes/paths';
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import useLocales from '../../../locals/useLocals';

// ----------------------------------------------------------------------
const RootStyle = styled('div')(() => ({
height: '100%',
}));
const DETAIL_COLLECTION = loader('../../../graphql/queries/collections/DetailCollection.graphql');

export default function PublictionCreate() {
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
    <Page title={t('publication.title')}>
      <RootStyle>
        <HeaderBreadcrumbs
          heading={t('create.createNewPost')}
          links={[
            { name: t('user.Management'), href: PATH_DASHBOARD.root },
            { name: t('publication.title'), href: PATH_DASHBOARD.publication.root },
            { name: t('navItem.create') },
          ]}
        />
        <PublicationNewForm isEdit={isEdit} dataPostUpdate={postUpdate} />
      </RootStyle>
    </Page>
  );
}
