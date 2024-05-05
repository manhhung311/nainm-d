// @mu
// import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import React from 'react';
import { useLocation } from 'react-router';
import useLocales from '../../../locals/useLocals';
import Publiction from '../../../sections/publication/Publication';

// components
import Page from '../../../components/Page';

// ----------------------------------------------------------------------
const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(10),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(10, 5),
  },
}));
// ----------------------------------------------------------------------
// const autoSwipe = autoPlay(SwipeableViews);

export default function PublictionList() {
  const { pathname } = useLocation();
  const { t } = useLocales();
  const isDashboard = pathname.includes('dashboard');

  return (
    <Page title={t('publication.publication')}>
      {isDashboard ? (
        <>
          <Publiction />
        </>
      ) : (
        <RootStyle>
          <Publiction />
        </RootStyle>
      )}
    </Page>
  );
}
