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
  padding: theme.spacing(5),
  borderRadius: Number(theme.shape.borderRadius) * 2,
  
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
        <RootStyle>
          <Publiction />
          </RootStyle>
      ) : (
        <RootStyle>
          
          <Publiction />
          </RootStyle>
      )}
    </Page>
  );
}
