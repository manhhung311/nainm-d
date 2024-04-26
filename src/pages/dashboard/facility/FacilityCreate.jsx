// @mui
import { styled } from '@mui/material/styles';
// components
import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/client';
import { useLocation, useParams } from 'react-router-dom';
import Page from '../../../components/Page';
import FacilityNewPostForm from '../../../sections/@dashboard/facility/FacilityNewPostForm';
import useLocales from '../../../locals/useLocals';
// ----------------------------------------------------------------------
const RootStyle = styled('div')(() => ({
  height: '100%',
}));
// ----------------------------------------------------------------------
const DETAIL_COLLECTION = loader('../../../graphql/queries/collections/DetailCollection.graphql');

export default function FacilityCreate() {
  const { pathname } = useLocation();

  const [postUpdate, setPostUpdate] = useState();

  const { id: idFacility } = useParams();

  const { data: detailCollection } = useQuery(DETAIL_COLLECTION, {
    variables: {
      id: idFacility,
    },
  });

  useEffect(() => {
    if (detailCollection) {
      setPostUpdate(detailCollection?.collection);
    }
  }, [idFacility, detailCollection]);

  const isEdit = pathname.includes('edit');

  const { t } = useLocales();

  return (
    <Page title={t('facility.page')}>
      <RootStyle>
        <Box>
          <FacilityNewPostForm isEdit={isEdit} dataPostUpdate={postUpdate} />
        </Box>
      </RootStyle>
    </Page>
  );
}
