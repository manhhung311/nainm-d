import React from 'react';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import { useLocation } from 'react-router-dom'; // Import _mock
import _mock from '../../_mock';
import { _facilityData } from '../../_mock/_facility';
import useLocales from '../../locals/useLocals';
import useResponsive from '../../hooks/useResponsive';
import Image from '../../components/Image';

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(5),
  borderRadius: Number(theme.shape.borderRadius) * 2,
}));

export default function FacilityMain() {
  const { pathname } = useLocation();
  const { t } = useLocales();
  const isMobile = useResponsive('between', 'xs', 'xs', 'sm');
  return (
    <RootStyle>
      <Grid container spacing={5} alignItems="center">
        {isMobile ? (
          <Grid item xs={12} sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
            <Typography variant="h4">{t('facility.title')}</Typography>
          </Grid>
        ) : (
          <Grid item xs={12}>
            <Typography variant="h4">{t('facility.title')}</Typography>
          </Grid>
        )}
        {_facilityData.map((item, index) => (
          <Grid item xs={6} md={4} key={index}>
            {isMobile ? (
              <Grid item xs={6} md={4}>
                <Box style={{ paddingTop: '0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Box style={{ width: '100%' }}>
                    <Image alt="avatar" src={item.image} />
                  </Box>
                </Box>
                <Box style={{ backgroundColor: '#ffff'  }}>
                  <Typography variant="subtitle2" style={{ textAlign: 'center' }}>
                    {_mock.text.sentence(0)}
                  </Typography>
                </Box>
              </Grid>
            ) : (
              <Grid item xs={6} md={4} sx={{ p: 0, border: 1, borderColor: '#D9D9D9', marginBottom: 5 }}>
                <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Box style={{ width: 'auto' }}>
                    <Image alt="avatar" src={item.image} />
                  </Box>
                </Box>
                <Box style={{ backgroundColor: '#ffff'}}>
                  <Typography variant="subtitle2" style={{ textAlign: 'center' }}>
                    {_mock.text.sentence(index)}
                  </Typography>
                </Box>
              </Grid>
            )}
          </Grid>
        ))}
      </Grid>
    </RootStyle>
  );
}
