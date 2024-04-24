// @mu
// import { useTheme } from '@mui/material/styles';
import { Grid,Autocomplete,TextField} from '@mui/material';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { styled, useTheme } from '@mui/material/styles';
import React from 'react';
import { useLocation } from 'react-router';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import useLocales from '../../../locals/useLocals';
import Publiction from '../../../sections/publication/Publication';

// components
import Page from '../../../components/Page';
// import { useState } from 'react';
// import SwipeableViews from 'react-swipeable-views';
// import { autoPlay } from 'react-swipeable-views-utils';

// ----------------------------------------------------------------------
const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(8),
  [theme.breakpoints.up('xs')]: {
    padding: theme.spacing(10, 8),
  },
}));
// ----------------------------------------------------------------------
// const autoSwipe = autoPlay(SwipeableViews);
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const top100Films =  [
  { label: 'The Godfather', id: 1 },
  { label: 'Pulp Fiction', id: 2 },
];
export default function PublictionList() {
  const { pathname } = useLocation();
  const { t } = useLocales();
  const isDashboard = pathname.includes('dashboard');

 
  
  return (
    <Page title={t('publication.publication')}>
      {isDashboard ? (
        <>
          <h1>{t('publication.publication')}</h1>
          <Autocomplete 
  disablePortal
  id="combo-box-demo"
  options={top100Films}

  sx={{ width: 300,my:2 }}
  renderInput={(params) => <TextField {...params} label="Search" />}
/>
          <Publiction />
        </>
      ) : (
        <RootStyle>
          <h1>{t('publication.publication')}</h1>
          <Autocomplete 
  disablePortal
  id="combo-box-demo"
  options={top100Films}

  sx={{ width: 300,my:2 }}
  renderInput={(params) => <TextField {...params} label="Search" />}
/>
        
          <Publiction />
        </RootStyle>
      )}
    </Page>
  );
}
