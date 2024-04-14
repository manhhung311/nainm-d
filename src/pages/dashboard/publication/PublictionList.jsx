// @mui
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { styled } from '@mui/material/styles';
import React from 'react';
import { useLocation } from 'react-router';
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
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(11),
  },
}));
// ----------------------------------------------------------------------
// const autoSwipe = autoPlay(SwipeableViews);

const images = [
  {
    img: 'https://static.wikia.nocookie.net/naruto/images/2/27/Kakashi_Hatake.png',
  },
  {
    img: 'https://static1.srcdn.com/wordpress/wp-content/uploads/naruto.jpg',
  },
];

export default function PublictionList() {
  const { pathname } = useLocation();
  const { t } = useLocales();
  const isDashboard = pathname.includes('dashboard');
  // const { movePicture, setMovePicture } = React.useState();
  // const maxSteps = images.length;

  // const clickNext = ()=>{
  //   setMovePicture((nextPciture)=>nextPicture+1)
  // }
  // const clickBack = () => {
  //   setMovePicture((nextPciture)=>nextPicture+1)
  // }

  return (
    <Page title={t('publication.publication')}>
      {isDashboard ? (
        <>
          <h1>{t('publication.publication')}</h1>
          <Publiction />
        </>
      ) : (
        <RootStyle>
          <h1>{t('publication.publication')}</h1>

          <Publiction />
        </RootStyle>
      )}
    </Page>
  );
}
