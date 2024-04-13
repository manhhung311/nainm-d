import React from 'react';
import { Box, Grid, Button, Stack, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
import HubIcon from '@mui/icons-material/Hub';
import { Link as RouterLink } from 'react-router-dom';
import FitbitSharpIcon from '@mui/icons-material/FitbitSharp';
import GrainSharpIcon from '@mui/icons-material/GrainSharp';
import BlurOnSharpIcon from '@mui/icons-material/BlurOnSharp';
import isString from 'lodash/isString';
import Image from '../../components/Image';

export default function Proccefer() {
  return (
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
                <li>
                  ★ Director, National Creative Research Initiative for Functionally Antagonistic Nano-Engineering
                </li>
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
          <Box sx={{ pt: 6 }}>
            <ListItem>
              <ListItemIcon>
                <FitbitSharpIcon sx={{ mr: 1, color: '#00FA9A' }} />
                <h3>EDUCATION</h3>
              </ListItemIcon>
            </ListItem>
            <List sx={{ ml: { xs: 0.5, md: 4 } }}>
              <ListItem>
                <ListItemIcon>
                  <GrainSharpIcon sx={{ fontSize: 'medium', color: '#66CDAA' }} />
                </ListItemIcon>
                <ListItemText primary="Ph.D. KAIST, Mechanical Engineering, Aug. 2001" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <GrainSharpIcon sx={{ fontSize: 'medium', color: '#66CDAA' }} />
                </ListItemIcon>
                <ListItemText primary="M.S. KAIST, Aerospace Engineering, Feb. 1997" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <GrainSharpIcon sx={{ fontSize: 'medium', color: '#66CDAA' }} />
                </ListItemIcon>
                <ListItemText primary="B.S. Inha University, Aerospace Engineering, Feb. 1995" />
              </ListItem>
            </List>
          </Box>
          <Box>
            <ListItem>
              <ListItemIcon>
                <FitbitSharpIcon sx={{ mr: 1, color: '#00FA9A' }} />
                <h3>WORK EXPERIENCE</h3>
              </ListItemIcon>
            </ListItem>
            <List sx={{ ml: { xs: 0.5, md: 4 } }}>
              <ListItem>
                <ListItemIcon>
                  <GrainSharpIcon sx={{ fontSize: 'medium', color: '#66CDAA' }} />
                </ListItemIcon>
                <ListItemText primary="Korea Advanced Institute of Science and Technology, Daejeon, Republic of Korea" />
              </ListItem>
              <ListItem sx={{ ml: 2 }}>
                <ListItemIcon>
                  <BlurOnSharpIcon sx={{ fontSize: 'small', color: '#66CDAA' }} />
                </ListItemIcon>
                <ListItemText primary="Full Professor (March. 2015 ~ Present)" />
              </ListItem>
              <ListItem sx={{ ml: 2 }}>
                <ListItemIcon>
                  <BlurOnSharpIcon sx={{ fontSize: 'small', color: '#66CDAA' }} />
                </ListItemIcon>
                <ListItemText primary="Department of Mechanical Engineering, School of Mechanical and Aerospace Engineering" />
              </ListItem>
            </List>
            <List sx={{ ml: { xs: 0.5, md: 4 } }}>
              <ListItem>
                <ListItemIcon>
                  <GrainSharpIcon sx={{ fontSize: 'medium', color: '#66CDAA' }} />
                </ListItemIcon>
                <ListItemText primary="Korea Advanced Institute of Science and Technology, Daejeon, Republic of Korea" />
              </ListItem>
              <ListItem sx={{ ml: 2 }}>
                <ListItemIcon>
                  <BlurOnSharpIcon sx={{ fontSize: 'small', color: '#66CDAA' }} />
                </ListItemIcon>
                <ListItemText primary="Associate Professor (Aug. 2010 ~ Feb. 2015)" />
              </ListItem>
              <ListItem sx={{ ml: 2 }}>
                <ListItemIcon>
                  <BlurOnSharpIcon sx={{ fontSize: 'small', color: '#66CDAA' }} />
                </ListItemIcon>
                <ListItemText primary="Graduate School of Ocean Systems Engineering, School of Mechanical, Aerospace and Systems Engineering" />
              </ListItem>
            </List>
            <List sx={{ ml: { xs: 0.5, md: 4 } }}>
              <ListItem>
                <ListItemIcon>
                  <GrainSharpIcon sx={{ fontSize: 'medium', color: '#66CDAA' }} />
                </ListItemIcon>
                <ListItemText primary="Chonnam National University, Gwangju, Republic of Korea" />
              </ListItem>
              <ListItem sx={{ ml: 2 }}>
                <ListItemIcon>
                  <BlurOnSharpIcon sx={{ fontSize: 'small', color: '#66CDAA' }} />
                </ListItemIcon>
                <ListItemText primary="Assistant Professor (Feb. 2004 – Mar. 2008)" />
              </ListItem>
              <ListItem sx={{ ml: 2 }}>
                <ListItemIcon>
                  <BlurOnSharpIcon sx={{ fontSize: 'small', color: '#66CDAA' }} />
                </ListItemIcon>
                <ListItemText primary="Associate Professor (Apr. 2008 – Aug. 2010)" />
              </ListItem>
              <ListItem sx={{ ml: 2 }}>
                <ListItemIcon>
                  <BlurOnSharpIcon sx={{ fontSize: 'small', color: '#66CDAA' }} />
                </ListItemIcon>
                <ListItemText primary="School of Mechanical Systems Engineering" />
              </ListItem>
            </List>
            <List sx={{ ml: { xs: 0.5, md: 4 } }}>
              <ListItem>
                <ListItemIcon>
                  <GrainSharpIcon sx={{ fontSize: 'medium', color: '#66CDAA' }} />
                </ListItemIcon>
                <ListItemText primary="LG Electronics Co.,LTD., Seoul, Republic of Korea" />
              </ListItem>
              <ListItem sx={{ ml: 2 }}>
                <ListItemIcon>
                  <BlurOnSharpIcon sx={{ fontSize: 'small', color: '#66CDAA' }} />
                </ListItemIcon>
                <ListItemText primary="Senior Researcher(Aug. 2001 – Feb. 2004)" />
              </ListItem>
              <ListItem sx={{ ml: 2 }}>
                <ListItemIcon>
                  <BlurOnSharpIcon sx={{ fontSize: 'small', color: '#66CDAA' }} />
                </ListItemIcon>
                <ListItemText primary="LG Digital Appliance Research Laboratory" />
              </ListItem>
            </List>
            <List sx={{ ml: { xs: 0.5, md: 4 } }}>
              <ListItem>
                <ListItemIcon>
                  <GrainSharpIcon sx={{ fontSize: 'medium', color: '#66CDAA' }} />
                </ListItemIcon>
                <ListItemText primary="Stanford University, Stanford, California, USA" />
              </ListItem>
              <ListItem sx={{ ml: 2 }}>
                <ListItemIcon>
                  <BlurOnSharpIcon sx={{ fontSize: 'small', color: '#66CDAA' }} />
                </ListItemIcon>
                <ListItemText primary="Visiting Scholar(Dec. 2006 – Dec. 2007), Department of Aerospace Engineering" />
              </ListItem>
            </List>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
