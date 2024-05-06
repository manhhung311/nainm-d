// @mui
import { styled } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';
// components
import React from 'react';
import Page from '../../../components/Page';
import FacilityMain from '../../../sections/facility/FacilityMain';
import useLocales from '../../../locals/useLocals';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { PATH_DASHBOARD } from '../../../routes/paths';
// ----------------------------------------------------------------------
const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(10),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(10, 5),
  },
}));
// ----------------------------------------------------------------------

export default function FacilityList() {
  const { pathname } = useLocation();

  const isDashboard = pathname.includes('dashboard');
  const { t } = useLocales();
  return (
    <>
      {isDashboard ? (
        <Page title={t('create.facilityList')}>
          <FacilityMain />
        </Page>
      ) : (
        <Page title={t('facility.title')}>
          <RootStyle>
            <FacilityMain />
          </RootStyle>
        </Page>
      )}
    </>
  );
}
