import React from 'react';
import { Autocomplete, Link, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import { useLocation } from 'react-router-dom'; // Import _mock
import isString from 'lodash/isString';
import ReactPlayer from 'react-player';
import _mock from '../../_mock';
import { _researchData } from '../../_mock/_research';
import useLocales from '../../locals/useLocals';
import useResponsive from '../../hooks/useResponsive';
import Image from '../../components/Image';
import useAuth from '../../hooks/useAuth';

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(5),
  borderRadius: Number(theme.shape.borderRadius) * 2,
}));

export default function ResearchMain() {
  const { pathname } = useLocation();
  const { t } = useLocales();

  const { user } = useAuth();

  console.log('user', user);

  const isMobile = useResponsive('between', 'xs', 'xs', 'sm');
  const options = [
    { label: _mock.text.title(1), id: 1 }, // Lấy tiêu đề từ _mock
    { label: _mock.text.title(2), id: 2 },
    { label: _mock.text.title(3), id: 3 },
    { label: _mock.text.title(4), id: 4 },
    { label: _mock.text.title(5), id: 5 },
  ];

  console.log('_researchData', _researchData);
  return (
    <RootStyle>
      <Grid container spacing={5} alignItems="center">
        {isMobile ? (
          <Grid item xs={12} sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
            <Typography variant="h4">
              {t('research.title')} {/* Lấy tiêu đề từ _mock */}
            </Typography>
          </Grid>
        ) : (
          <Grid item xs={12}>
            <Typography variant="h4">
              {t('research.title')} {/* Lấy tiêu đề từ _mock */}
            </Typography>
          </Grid>
        )}
        <Grid item xs={12} md={3}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={options}
            fullWidth
            renderInput={(params) => <TextField {...params} label="Search" />}
          />
        </Grid>
        {_researchData.map((item, index) => (
          <Grid item xs={12} key={index}>
            <Typography variant="h5">{item.title}</Typography>
            {item.data.map((data, idx) => (
              <Typography variant="body1" key={idx}>
                {data}
              </Typography>
            ))}
            {isMobile ? (
              <Grid item xs={12}>
                <Box style={{ paddingTop: '0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Box style={{ width: '100%' }}>
                    <Image alt="avatar" src={item.image} />
                  </Box>
                </Box>
                <Box style={{ backgroundColor: '#111A51', color: '#ffff' }}>
                  <Typography variant="subtitle2" style={{ textAlign: 'center' }}>
                    {_mock.text.sentence(0)}
                  </Typography>
                </Box>
              </Grid>
            ) : (
              <Grid item xs={12} sx={{ p: 0, border: 1, borderColor: '#D9D9D9', marginBottom: 5 }}>
                <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Box style={{ width: 'auto' }}>
                    <Image alt="avatar" src={item.image} />
                  </Box>
                </Box>
                <Box style={{ backgroundColor: '#111A51', color: '#ffff' }}>
                  <Typography variant="subtitle2" style={{ textAlign: 'center' }}>
                    {_mock.text.sentence(index)}
                  </Typography>
                </Box>
              </Grid>
            )}
          </Grid>
        ))}
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
          {/* video youtube */}
          {isMobile ? (
            <ReactPlayer controls url="https://www.youtube.com/watch?v=a8a9uO1Rpjs&t=2s" width="100%" />
          ) : (
            <ReactPlayer controls url="https://www.youtube.com/watch?v=a8a9uO1Rpjs&t=2s" width="80%" />
          )}
        </Grid>
      </Grid>
    </RootStyle>
  );
}
