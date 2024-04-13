import React from 'react';
import { Autocomplete, Link, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import { useLocation } from 'react-router-dom'; // Import _mock
import isString from 'lodash/isString';
import _mock from '../../_mock';
import useLocales from '../../locals/useLocals';
import useResponsive from '../../hooks/useResponsive';
import Image from '../../components/Image';

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(5),
  borderRadius: Number(theme.shape.borderRadius) * 2,
}));

const options = [
  { label: _mock.text.title(1), id: 1 }, // Lấy tiêu đề từ _mock
  { label: _mock.text.title(2), id: 2 },
  { label: _mock.text.title(3), id: 3 },
  { label: _mock.text.title(4), id: 4 },
  { label: _mock.text.title(5), id: 5 },
];

export default function ResearchMain() {
  const { pathname } = useLocation();
  const { t } = useLocales();
  const isMobile = useResponsive('between', 'xs', 'xs', 'sm');
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
        <Grid item xs={12}>
          <Typography variant="h5">{_mock.text.title(1)}</Typography>
          <Typography variant="body1">
            {_mock.text.description(0)} {/* Mô tả của đối tượng */}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">{_mock.text.title(6)}</Typography>
          <Typography variant="body1">1. {_mock.text.description(1)}</Typography>
          <Typography variant="body1">2. {_mock.text.description(2)}</Typography>
        </Grid>
        {isMobile ? (
          <Grid item xs={12}>
            <Box style={{ paddingTop: '0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Box style={{ width: '100%' }}>
                <Image alt="avatar" src={_mock.image.cover(0)} />
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
                <Image alt="avatar" src={_mock.image.cover(0)} />
              </Box>
            </Box>
            <Box style={{ backgroundColor: '#111A51', color: '#ffff' }}>
              <Typography variant="subtitle2" style={{ textAlign: 'center' }}>
                {_mock.text.sentence(0)}
              </Typography>
            </Box>
          </Grid>
        )}
        {isMobile ? (
          <Grid item xs={12}>
            <Box style={{ paddingTop: '0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Box style={{ width: '100%' }}>
                <Image alt="avatar" src={_mock.image.cover(1)} />
              </Box>
            </Box>
            <Box style={{ backgroundColor: '#111A51', color: '#ffff' }}>
              <Typography variant="subtitle2" style={{ textAlign: 'center' }}>
                {_mock.text.sentence(1)}
              </Typography>
            </Box>
          </Grid>
        ) : (
          <Grid item xs={12} sx={{ p: 0, border: 1, borderColor: '#D9D9D9', marginBottom: 5 }}>
            <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Box style={{ width: 'auto' }}>
                <Image alt="avatar" src={_mock.image.cover(1)} />
              </Box>
            </Box>
            <Box style={{ backgroundColor: '#111A51', color: '#ffff' }}>
              <Typography variant="subtitle2" style={{ textAlign: 'center' }}>
                {_mock.text.sentence(1)}
              </Typography>
            </Box>
          </Grid>
        )}
        <Grid item xs={12}>
          <Typography variant="h6">{_mock.text.title(7)}</Typography>
          <Typography variant="body1">1. {_mock.text.description(3)}</Typography>
        </Grid>
        {isMobile ? (
          <Grid item xs={12}>
            <Box style={{ paddingTop: '0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Box style={{ width: '100%' }}>
                <Image alt="avatar" src={_mock.image.cover(2)} />
              </Box>
            </Box>
            <Box style={{ backgroundColor: '#111A51', color: '#ffff' }}>
              <Typography variant="subtitle2" style={{ textAlign: 'center' }}>
                {_mock.text.sentence(2)}
              </Typography>
            </Box>
          </Grid>
        ) : (
          <Grid item xs={12} sx={{ p: 0, border: 1, borderColor: '#D9D9D9', marginBottom: 5 }}>
            <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Box style={{ width: 'auto' }}>
                <Image alt="avatar" src={_mock.image.cover(2)} />
              </Box>
            </Box>
            <Box style={{ backgroundColor: '#111A51', color: '#ffff' }}>
              <Typography variant="subtitle2" style={{ textAlign: 'center' }}>
                {_mock.text.sentence(2)}
              </Typography>
            </Box>
          </Grid>
        )}
        <Grid item xs={12}>
          <Typography variant="body1">2. {_mock.text.description(4)}</Typography>
        </Grid>
        {isMobile ? (
          <Grid item xs={12}>
            <Box style={{ paddingTop: '0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Box style={{ width: '100%' }}>
                <Image alt="avatar" src={_mock.image.cover(3)} />
              </Box>
            </Box>
            <Box style={{ backgroundColor: '#111A51', color: '#ffff' }}>
              <Typography variant="subtitle2" style={{ textAlign: 'center' }}>
                {_mock.text.sentence(3)}
              </Typography>
            </Box>
          </Grid>
        ) : (
          <Grid item xs={12} sx={{ p: 0, border: 1, borderColor: '#D9D9D9', marginBottom: 5 }}>
            <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Box style={{ width: 'auto' }}>
                <Image alt="avatar" src={_mock.image.cover(3)} />
              </Box>
            </Box>
            <Box style={{ backgroundColor: '#111A51', color: '#ffff' }}>
              <Typography variant="subtitle2" style={{ textAlign: 'center' }}>
                {_mock.text.sentence(3)}
              </Typography>
            </Box>
          </Grid>
        )}
        <Grid item xs={12}>
          <Typography variant="body1">3. {_mock.text.description(4)}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">{_mock.text.title(8)}</Typography>
        </Grid>
        <Grid item xs={12} sx={{ paddingTop: 0 }}>
          <Typography variant="body1">{_mock.text.description(6)}</Typography>
          <Typography variant="subtitle1">{_mock.text.description(7)}</Typography>
          <Typography variant="body1">{_mock.text.description(8)}</Typography>
          <Link target="_blank" href="https://doi.org/10.1002/adfm.202111145">
            {_mock.text.description(17)}
          </Link>
        </Grid>
        <Grid item xs={12} sx={{ paddingTop: 0 }}>
          <Typography variant="body1">{_mock.text.description(10)}</Typography>
          <Typography variant="subtitle1">{_mock.text.description(11)}</Typography>
          <Typography variant="body1">{_mock.text.description(12)}</Typography>
          <Link target="_blank" href="https://doi.org/10.1002/advs.202102064">
            {_mock.text.description(13)}
          </Link>
        </Grid>
        <Grid item xs={12} sx={{ paddingTop: 0 }}>
          <Typography variant="body1">{_mock.text.description(14)}</Typography>
          <Typography variant="subtitle1">{_mock.text.description(15)}</Typography>
          <Typography variant="body1">{_mock.text.description(16)}</Typography>
          <Link target="_blank" href="https://doi.org/10.1002/adfm.202003863">
            {_mock.text.description(17)}
          </Link>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">{_mock.text.title(9)}</Typography>
        </Grid>
        <Grid item xs={12} sx={{ paddingTop: 0 }}>
          <Typography variant="body1">{_mock.text.description(18)}</Typography>
        </Grid>
        <Grid item xs={12}>
          {/* video youtube */}
          <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box style={{ position: 'relative', paddingBottom: '50%', width: '100%', height: 0 }}>
              <iframe
                src="https://www.youtube.com/embed/a8a9uO1Rpjs"
                title="YouTube video player"
                frameBorder="0"
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </RootStyle>
  );
}
