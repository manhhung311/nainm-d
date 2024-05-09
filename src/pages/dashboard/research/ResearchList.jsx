// @mui
import { styled } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';
// components
import React from 'react';
import Page from '../../../components/Page';
import ResearchMain from '../../../sections/research/ResearchMain';
import useLocales from '../../../locals/useLocals';
import ResearchDetail from '../../../sections/@dashboard/research/ResearchDetail';
// ----------------------------------------------------------------------
const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(10),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(10, 5),
  },
}));
// ----------------------------------------------------------------------

export default function ResearchList() {
  const { pathname } = useLocation();

  const isDashboard = pathname.includes('dashboard');
  const { t } = useLocales();
  return (
    <>
      {isDashboard ? (
        <Page title={t('create.researchList')}>
          <ResearchMain />
        </Page>
      ) : (
        <Page title={t('research.title')}>
          <RootStyle>
            <ResearchDetail />
          </RootStyle>
        </Page>
      )}
    </>
  );
}
