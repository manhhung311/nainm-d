// @mui
import { styled } from '@mui/material/styles';
// components
import React, { useState } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import Page from '../../../components/Page';
import NewsNewPostForm from '../../../sections/@dashboard/news/NewsPostForm';
import useLocales from '../../../locals/useLocals';
// ----------------------------------------------------------------------
const RootStyle = styled('div')(() => ({
  height: '100%',
}));
// ----------------------------------------------------------------------

export default function NewsCreate() {
  const [currentTab, setCurrentTab] = useState(1);

  const { t } = useLocales();

  const handleTabClick = (tabIndex) => {
    setCurrentTab(tabIndex);
  };
  return (
    <Page title={t('news.page')}>
      <RootStyle>
        <Box>
          <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{ mb: 4, mt: 1 }}>
            <Grid item xs={6} md={3} sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
              <Button
                sx={{ width: '100%', height: '100%', borderRadius: 2 }}
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
                <Typography variant="h5">{t('news.tab1')}</Typography>
              </Button>
            </Grid>
            <Grid item xs={6} md={3} sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
              <Button
                sx={{ width: '100%', height: '100%', borderRadius: 2 }}
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
                <Typography variant="h5">{t('news.tab2')}</Typography>
              </Button>
            </Grid>
          </Grid>
          {currentTab === 1 && (
            <Box>
              <Typography sx={{ justifyContent: 'center', display: 'flex', pb: 3 }} variant="h6">
                {t('news.post1')}
              </Typography>
              <NewsNewPostForm />
            </Box>
          )}
          {currentTab === 2 && (
            <Box>
              <Typography sx={{ justifyContent: 'center', display: 'flex', pb: 3 }} variant="h6">
                {t('news.post2')}
              </Typography>
              <NewsNewPostForm />
            </Box>
          )}
        </Box>
      </RootStyle>
    </Page>
  );
}
