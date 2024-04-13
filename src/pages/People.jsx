// @mui
import { styled } from '@mui/material/styles';
// components
import React from 'react';
import Page from '../components/Page';

import Proccefer from '../sections/people/proccefer';

import useLocales from '../locals/useLocals';
// ----------------------------------------------------------------------
const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(8),
  [theme.breakpoints.up('xs')]: {
    padding: theme.spacing(11, 2),
  },
}));
// ----------------------------------------------------------------------

export default function People() {
  const { t } = useLocales();
  return (
    <Page title={t('people.page')}>
      <RootStyle>
        <h1>PEOPLE</h1>
        <Proccefer />
      </RootStyle>
    </Page>
  );
}
