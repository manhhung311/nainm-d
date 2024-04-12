import React from 'react';
import { Autocomplete, Box, Grid, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import _mock from '../../_mock';

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(5),
  backgroundColor: theme.palette.background.neutral,
  borderRadius: Number(theme.shape.borderRadius) * 2,
}));
const options = [
  { label: _mock.text.title(0), id: 1 }, // Lấy tiêu đề từ _mock
  { label: _mock.text.title(1), id: 2 },
  { label: _mock.text.title(2), id: 3 },
];
export default function ResearchMain() {
  return (
    <RootStyle>
      <Typography variant="h3" sx={{ mb: 5 }}>
        RESEARCH
      </Typography>
      <Box
        style={{
          width: '100%',
        }}
      >
        <Box sx={{ marginBottom: 5 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={options}
                sx={{ width: '100%' }}
                renderInput={(params) => <TextField {...params} label="Search" />}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <Typography variant="h4">Nano Generators and Green Energy</Typography>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ marginBottom: 5 }}>
          <Grid container spacing={2}>
            <Box>
              <Box>
                <Typography variant="subtitle1" sx={{ mb: 5 }}>
                  Nano Generators and Green Energy
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Box>
      </Box>
    </RootStyle>
  );
}
