// form
// @mui
import { Button, Card, Grid, Stack, Typography } from '@mui/material';
// routes
// components
import React, { useState } from 'react';
import useLocales from '../../locals/useLocals';
import TapVNStack from './TapVNStack';
import TapENGStack from './TapENGStack';

// ----------------------------------------------------------------------

TapForm.propTypes = {};

export default function TapForm() {
  const [currentTab, setCurrentTab] = useState(1);

  const { t } = useLocales();

  const handleTabClick = (tabIndex) => {
    setCurrentTab(tabIndex);
  };

  return (
    <Grid item xs={12} md={7}>
      <Stack sx={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', py: 2 }}>
        <Button
          sx={{ width: '100%', height: '100%', borderRadius: 2, mx: 1 }}
          size="large"
          variant="outlined"
          style={
            currentTab === 1
              ? { backgroundColor: '#4BD578', color: '#fff' }
              : { backgroundColor: '#fff', color: '#000' }
          }
          className={currentTab === 1 ? 'active' : ''}
          disabled
        >
          <Typography variant="h5">{t('facility.tab1')}</Typography>
        </Button>

        <Button
          sx={{ width: '100%', height: '100%', borderRadius: 2, mx: 1 }}
          size="large"
          variant="outlined"
          style={
            currentTab === 2
              ? { backgroundColor: '#4BD578', color: '#fff' }
              : { backgroundColor: '#fff', color: '#000' }
          }
          className={currentTab === 2 ? 'active' : ''}
          disabled
        >
          <Typography variant="h5">{t('facility.tab2')}</Typography>
        </Button>
      </Stack>

      <Grid container spacing={3} sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
        <Grid item xs={12}>
          <Card sx={{ p: 3 }}>
            {currentTab === 1 ? <TapVNStack onNext={handleTabClick} /> : <TapENGStack onBack={handleTabClick} />}
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
}
