// @mui
import { styled } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';
// components
import React from 'react';
import Page from '../../../components/Page';
import NewsMain from '../../../sections/news/newsmain';
import useLocales from '../../../locals/useLocals';
// ----------------------------------------------------------------------
const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(11, 10),
  },
}));
// ----------------------------------------------------------------------

export default function NewsList() {
  const { pathname } = useLocation();

  const { t } = useLocales();

  const isDashboard = pathname.includes('dashboard');
  return (
    <Page title={t('news.title')}>
      {isDashboard ? (
        <NewsMain />
      ) : (
        <RootStyle>
          <NewsMain />
        </RootStyle>
      )}
    </Page>
  );
}
