import React from 'react';
import { Box, Grid, Button, Stack, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
import HubIcon from '@mui/icons-material/Hub';
import { Link as RouterLink } from 'react-router-dom';
import FitbitSharpIcon from '@mui/icons-material/FitbitSharp';
import GrainSharpIcon from '@mui/icons-material/GrainSharp';
import BlurOnSharpIcon from '@mui/icons-material/BlurOnSharp';
import isString from 'lodash/isString';
import { InlineIcon } from '@iconify/react';
import Image from '../../components/Image';
import _mock from '../../_mock';
import { _peopleData } from '../../_mock/_user';
import Iconify from '../../components/Iconify';

export default function Proccefer() {
  const IconText = [
    <ListItem>
      <ListItemIcon>
        <FitbitSharpIcon sx={{ mr: 1, color: '#00FA9A' }} />
      </ListItemIcon>
    </ListItem>,
    <ListItem>
      <ListItemIcon>
        <GrainSharpIcon sx={{ fontSize: 'medium', color: '#66CDAA' }} />
      </ListItemIcon>
    </ListItem>,
  ];

  return (
    // {IconText.map((item, index) => ())}
    <Box sx={{ p: 1 }}>
      <Grid container>
        <Grid item xs={12} md={3}>
          <Box>
            <Image
              alt="preview"
              src="https://img4.thuthuatphanmem.vn/uploads/2020/08/27/anh-dai-dien-zalo-cuc-ngau_052909187.jpg"
              ratio="4/5"
              sx={{ borderRadius: 2 }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={9}>
          <Box>
            <Box sx={{ pb: 2, ml: { xs: 2, md: 6 } }}>
              <h2>ILKWON OH (오일권)</h2>
            </Box>
            <Box sx={{ p: 3, pl: { xs: 2, md: 6 } }}>
              <ul type="none">
                <li>★ {_mock.text.title(0)}</li>
                <li>★ Director, Soft Robotics & Intelligent Materials Lab</li>
              </ul>
            </Box>
            <Box sx={{ p: 3, pl: { xs: 2, md: 6 } }}>
              <ul type="none">
                <li>★ Full Professor, Ph.D.</li>
                <li>★ Department of Mechanical Engineering</li>
                <li>★ School of Mechanical and Aerospace Engineering</li>
                <li>★ Korea Advanced Institute of Science and Technology (KAIST)</li>
              </ul>
            </Box>
            <Grid container>
              <Grid item xs={12} sm={4} md={3} lg={2}>
                <Button
                  sx={{ width: 170, ml: { xs: 2, md: 6 }, mt: { xs: 0, md: 6, mt: 4 }, bgcolor: '#00FA9A' }}
                  target="_blank"
                  variant="contained"
                  endIcon={<LaunchIcon />}
                  component={RouterLink}
                  href="http://scholar.google.co.kr/citations?user=GJHV48MAAAAJ"
                  to="http://scholar.google.co.kr/citations?user=GJHV48MAAAAJ"
                >
                  Google Scholar
                </Button>
              </Grid>
              <Grid item xs={12} sm={8} md={9} lg={10}>
                <Button
                  sx={{ color: '#181818', ml: { xs: 2, md: 6 }, mt: { xs: 0, md: 6, mt: 4 } }}
                  variant="text"
                  target="_blank"
                  component={RouterLink}
                  href="http://scholar.google.co.kr/citations?user=GJHV48MAAAAJ"
                  to="http://scholar.google.co.kr/citations?user=GJHV48MAAAAJ"
                >
                  http://scholar.google.co.kr/citations?user=GJHV48MAAAAJ
                </Button>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12} sm={4} md={3} lg={2}>
                <Button
                  sx={{ width: 170, ml: { xs: 2, md: 6 }, mt: 2 }}
                  target="_blank"
                  variant="contained"
                  endIcon={<LaunchIcon />}
                  component={RouterLink}
                  href="http://www.researcherid.com/rid/B-7121-2011"
                  to="http://www.researcherid.com/rid/B-7121-2011"
                >
                  Rearcher ID
                </Button>
              </Grid>
              <Grid item xs={12} sm={8} md={9} lg={10}>
                <Button
                  sx={{ color: '#181818', ml: { xs: 2, md: 6 }, mt: 2 }}
                  target="_blank"
                  variant="text"
                  component={RouterLink}
                  href="http://www.researcherid.com/rid/B-7121-2011"
                  to="http://www.researcherid.com/rid/B-7121-2011"
                >
                  http://www.researcherid.com/rid/B-7121-2011
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12} sm={8} md={9} lg={10}>
          {_peopleData.map((item, index) => (
            <Box sx={{ pt: 5 }} key={index}>
              <ListItem>
                <ListItemIcon>
                  <FitbitSharpIcon sx={{ mr: 1, color: '#00FA9A' }} />
                  <Typography variant="h6">{item.title}</Typography>
                </ListItemIcon>
              </ListItem>
              <List sx={{ ml: { xs: 0.5, md: 4 } }}>
                {item.data.map((data, idx) => (
                  <ListItem key={idx}>
                    <ListItemIcon>
                      <GrainSharpIcon sx={{ fontSize: 'medium', color: '#66CDAA' }} />
                    </ListItemIcon>
                    <Typography variant="body1">{data}</Typography>
                  </ListItem>
                ))}
              </List>
            </Box>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
}
