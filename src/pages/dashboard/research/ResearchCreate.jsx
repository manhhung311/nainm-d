// @mui
import { styled } from '@mui/material/styles';
// components
import { Box, Button, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import Page from '../../../components/Page';

import ResearchNewPostForm from '../../../sections/@dashboard/research/ResearchNewPostForm';
import { useLocales } from '../../../locals';
// ----------------------------------------------------------------------
const RootStyle = styled('div')(() => ({
  height: '100%',
}));
// ----------------------------------------------------------------------

export default function ResearchCreate() {
  const [currentTab, setCurrentTab] = useState(1);

  const { t } = useLocales();

  const handleTabClick = (tabIndex) => {
    setCurrentTab(tabIndex);
  };
  return (
    <Page title="Tạo công bố dự án nghiên cứ">
      <RootStyle>
        <Box>
          <Grid container justifyContent="center" alignItems="center" sx={{ mb: 8, mt: 1 }}>
            <Grid item xs={6} md={3} sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
              <Button
                sx={{width: '100%', height: '100%',borderRadius: 20 }}
                size="large"
                variant="outlined"
                style={
                  currentTab === 1
                    ? { backgroundColor: '#4BD578', color: '#fff'}
                    : { backgroundColor: '#fff', color: '#000' }
                }
                onClick={() => handleTabClick(1)}
                className={currentTab === 1 ? 'active' : ''}
              >
                <Typography variant="h5">{t('research.tab1')}</Typography>
              </Button>
            </Grid>
            <Grid item xs={6} md={3} sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
              <Button
                sx={{width: '100%', height: '100%',borderRadius: 20 }}
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
                <Typography variant="h5">{t('research.tab2')}</Typography>
              </Button>
            </Grid>
          </Grid>
          {currentTab === 1 && (
            <Box>
              <Typography sx={{justifyContent: 'center', display: 'flex',pb:3 }} variant='h6'>{t('research.post1')}</Typography>
              <ResearchNewPostForm />
            </Box>
          )}
          {currentTab === 2 && (
            <Box>
              <Typography sx={{justifyContent: 'center', display: 'flex',pb:3}} variant='h6'>{t('research.post2')}</Typography>
              <ResearchNewPostForm />
            </Box>
          )}
        </Box>

      </RootStyle>
    </Page>
  );
}
