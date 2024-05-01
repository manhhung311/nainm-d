import { Box, Grid, Typography, Divider } from '@mui/material';
import React from 'react';
import { styled } from '@mui/material/styles';
import Image from '../../components/Image';
import { _studentData } from '../../_mock/_student';
// ----------------------------------------------------------------------
const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(8, 5),
  },
}));
// ----------------------------------------------------------------------
export default function Student() {
  console.log('_studentData', _studentData);
  return (
    <RootStyle>
    <Box>
      {_studentData.map((item, index) => (
        <div key={index}>
          <Divider sx={{ mb: 7 }} />
          <Grid container sx={{ justifyContent: 'center', display: 'flex', mb: 4 }} spacing={5} key={index}>
            <Grid item xs={6} md={2}>
              <Image alt="preview" src={item.image} ratio='3/4' sx={{ borderRadius: 2 }} />
            </Grid>
            <Grid item xs={12} md={10}>
              <Typography variant="h6">NAME: {item.title}</Typography>
              {item.data.map((data, idx) => (
                <Typography key={idx}>{data}</Typography>
              ))}
            </Grid>
          </Grid>
        </div>
      ))}
    </Box>
    </RootStyle>
  );
}
