// @mui
import { styled } from '@mui/material/styles';
// components
import React from 'react';
import Page from '../components/Page';

import Proccefer from '../sections/people/proccefer';
import Iconify from '../components/Iconify';
// ----------------------------------------------------------------------
const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(8),
  [theme.breakpoints.up('xs')]: {
    padding: theme.spacing(11, 2),
  },
}));
// ----------------------------------------------------------------------

export default function People() {
  return (
    <Page title="Nhân sự">
      <RootStyle>
        <h1>PEOPLE</h1>
        <Proccefer />
      </RootStyle>
    </Page>
  );
}
