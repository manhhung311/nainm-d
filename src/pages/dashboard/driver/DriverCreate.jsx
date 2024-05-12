// @mui
import { styled } from '@mui/material/styles';
// components
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { loader } from 'graphql.macro';
import Page from '../../../components/Page';
import DriverNewPostForm from '../../../sections/@dashboard/driver/DriverNewPostForm';
import useLocales from '../../../locals/useLocals';
// ----------------------------------------------------------------------
const RootStyle = styled('div')(() => ({
  height: '100%',
}));
// ----------------------------------------------------------------------
const DETAIL_COLLECTION = loader('../../../graphql/queries/collections/DetailCollection.graphql');

export default function DriverCreate() {
  const { pathname } = useLocation();

  const [postUpdate, setPostUpdate] = useState();

  const { id: idDriver } = useParams();

  const { data: detailCollection } = useQuery(DETAIL_COLLECTION, {
    variables: {
      id: idDriver,
    },
  });

  useEffect(() => {
    if (detailCollection) {
      setPostUpdate(detailCollection?.collection);
    }
  }, [idDriver, detailCollection]);

  const isEdit = pathname.includes('edit');

  const { t } = useLocales();
  return (
    <Page title={t('driver.title')}>
      <RootStyle>
        <DriverNewPostForm isEdit={isEdit} dataPostUpdate={postUpdate} />
      </RootStyle>
    </Page>
  );
}
