import React from 'react';
import { Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';
import useLocales from '../../locals/useLocals';
import _mock from '../../_mock';
import { _newsData } from '../../_mock/_news';
import useResponsive from '../../hooks/useResponsive';
import Image from '../../components/Image';
import useAuth from '../../hooks/useAuth';
import { fDate } from '../../utils/formatTime';

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(5),
  borderRadius: Number(theme.shape.borderRadius) * 2,
}));

export default function NewsMain() {
  const { pathname } = useLocation();
  const { t } = useLocales();

  const { user } = useAuth();

  console.log('user', user);
  console.log('time', _mock.time(1));

  const isMobile = useResponsive('between', 'xs', 'xs', 'sm');

  return (
    <RootStyle>
      <Grid container spacing={5} alignItems="center">
        {isMobile ? (
          <Grid item xs={12} sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
            <Typography variant="h4"> {t('news.title')}</Typography>
          </Grid>
        ) : (
          <Grid item xs={12}>
            <Typography variant="h4">{t('news.title')}</Typography>
          </Grid>
        )}
        {_newsData.map((item, index) => (
          <Grid item xs={6} md={4} key={index}>
            {item.data.map((data, idx) => (
              <Typography variant="body1" key={idx}>
                {data}
              </Typography>
            ))}
            {isMobile ? (
              <Grid item xs={6} md={4} sx={{ p: 0, border: 1, borderColor: '#D9D9D9', marginBottom: 5 }}>
                <Box style={{ paddingTop: '0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Box style={{ width: '100%' }}>
                    <Image alt="avatar" src={item.image} />
                  </Box>
                </Box>
                <Box style={{ width: '100%', justifyContent: 'center', alignItems: 'center', minHeight: '100px' }}>
                  <Typography variant="subtitle1" style={{ textAlign: 'center' }}>
                    {_mock.text.sentence(index)}
                  </Typography>
                  <Typography variant="subtitle1" style={{ textAlign: 'center' }}>
                    {fDate(_mock.time(index))}
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
                <Stack
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    minHeight: '100px',
                    flexDirection: 'column',
                  }}
                >
                  <Typography variant="subtitle1" style={{ textAlign: 'center' }}>
                    {_mock.text.sentence(index)}
                  </Typography>
                  <Typography variant="subtitle1" style={{ textAlign: 'center' }}>
                    {fDate(_mock.time(index))}
                  </Typography>
                </Stack>
              </Grid>
            )}
          </Grid>
        ))}
      </Grid>
    </RootStyle>
  );
}
