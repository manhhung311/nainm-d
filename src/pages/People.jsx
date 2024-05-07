import React, { useState } from 'react';
// @mui

import { Box, Button, Grid, Typography } from '@mui/material';
// components

import Page from '../components/Page';
import Proccefer from '../sections/people/proccefer';
import Student from '../sections/people/student';

import useLocales from '../locals/useLocals';
// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
export default function People() {
  const { t } = useLocales();
  const [currentTab, setCurrentTab] = useState(1);

  const handleTabClick = (tabIndex) => {
    setCurrentTab(tabIndex);
  };
  return (
    <Page title={t('people.page')}>
      <Box>
        <Grid container justifyContent="center" alignItems="center" sx={{ mb: 8, mt: 1,pt :5 }}>
          <Grid item xs={6} md={3} sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
            <Button
              sx={{ width: '100%', height: '100%', borderRadius: 0 }}
              size="large"
              variant="outlined"
              style={
                currentTab === 1
                  ? { backgroundColor: '#4BD578', color: '#fff' }
                  : { backgroundColor: '#fff', color: '#000' }
              }
              onClick={() => handleTabClick(1)}
              className={currentTab === 1 ? 'active' : ''}
            >
              <Typography variant="h5">{t('people.tab1')}</Typography>
            </Button>
          </Grid>
          <Grid item xs={6} md={3} sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
            <Button
              sx={{ width: '100%', height: '100%', borderRadius: 0 }}
              size="large"
              variant="outlined"
              style={
                currentTab === 2
                  ? { backgroundColor: '#4BD578', color: '#fff' }
                  : { backgroundColor: '#fff', color: '#000' }
              }
              onClick={() => handleTabClick(2)}
              className={currentTab === 2 ? 'active' : ''}
            >
              <Typography variant="h5">{t('people.tab2')}</Typography>
            </Button>
          </Grid>
        </Grid>
        {currentTab === 1 && (
          <Box>
            <Proccefer />
          </Box>
        )}
        {currentTab === 2 && (
          <Box>
            <Student />
          </Box>
        )}
      </Box>
    </Page>
  );
}
