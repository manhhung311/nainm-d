import React from 'react';
import { Autocomplete, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import _mock from '../../_mock'; // Import _mock

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(5),
  backgroundColor: theme.palette.background.neutral,
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
  return (
    <RootStyle>
      <Grid container spacing={5} alignItems="center">
        <Grid item xs={12}>
          <Typography variant="h4">
            {_mock.text.title(0)} {/* Lấy tiêu đề từ _mock */}
          </Typography>
        </Grid>
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
          <Typography variant="subtitle1">{_mock.text.title(6)}</Typography>
          <Typography variant="body1">1. {_mock.text.description(1)}</Typography>
          <Typography variant="body1">2. {_mock.text.description(2)}</Typography>
        </Grid>
        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', paddingBottom: '0' }}>
          <img src={_mock.image.cover(0)} alt="Ảnh mô tả" style={{ width: '100%' }} />
        </Grid>
        <Grid item xs={12} style={{ backgroundColor: '#111A51', color: '#ffff' }}>
          <Typography variant="subtitle2" style={{ textAlign: 'center' }}>
            {_mock.text.sentence(2)}
          </Typography>
        </Grid>
        <Grid item xs={12} />
      </Grid>
    </RootStyle>
  );
}
