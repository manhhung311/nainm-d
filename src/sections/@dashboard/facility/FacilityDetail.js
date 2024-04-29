import React from 'react';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import { useLocation } from 'react-router-dom'; // Import _mock
import _mock from '../../../_mock';
import useLocales from '../../../locals/useLocals';
import useResponsive from '../../../hooks/useResponsive';
import Image from '../../../components/Image';
import { _facilityData } from '../../../_mock/_facility';

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(5),
  borderRadius: Number(theme.shape.borderRadius) * 2,
  paddingTop: theme.spacing(12),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(16),
  },
}));
export default function FacilityMain() {
  const { t } = useLocales();
  const isMobile = useResponsive('between', 'xs', 'xs', 'sm');
  return (
    <RootStyle>
      <Grid container spacing={5} alignItems="center">
        {isMobile ? (
          <>
            <Grid item xs={12} sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
              <Typography variant="h4"> {t('facility.title')}</Typography>
            </Grid>
            <Grid item xs={12} sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
              <Typography variant="body1">Tên thiết bị</Typography>
            </Grid>
          </>
        ) : (
          <>
            <Grid item xs={12}>
              <Typography variant="h4">{t('facility.title')}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">Tên thiết bị</Typography>
            </Grid>
          </>
        )}

        <Grid item xs={12}>
          {isMobile ? (
            <>
              <Grid item xs={12} sx={{ p: 0, border: 1, borderColor: '#D9D9D9', marginBottom: 5 }}>
                <Box style={{ paddingTop: '0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Box style={{ width: '100%' }}>
                    <Image alt="avatar" src={'/logo.png'} />
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="description" style={{ textAlign: 'center' }}>
                  {_mock.text.description(1)}
                </Typography>
              </Grid>
            </>
          ) : (
            <>
              <Grid item xs={12} sx={{ p: 0, border: 1, borderColor: '#D9D9D9', marginBottom: 5 }}>
                <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Box style={{ width: '100%' }}>
                    <Image alt="avatar" src={'/logo.png'} />
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="description" style={{ textAlign: 'center' }}>
                  {_mock.text.description(1)}
                </Typography>
              </Grid>
            </>
          )}
        </Grid>
      </Grid>
    </RootStyle>
  );
}
