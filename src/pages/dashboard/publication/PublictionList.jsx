// @mui
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';

// components
import Page from '../../../components/Page';

// ----------------------------------------------------------------------
const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(11),
  },
}));
// ----------------------------------------------------------------------

export default function PublictionList() {
  const { pathname } = useLocation();

  const isDashboard = pathname.includes('dashboard');
  return (
    <Page title="Dự án nghiên cứu">
      {isDashboard ? (
        <h1>Dự án nghiên cứu</h1>
      ) : (
        <RootStyle>
          <h1>Dự án nghiên cứu</h1>
          <Card sx={{ my: 2 }}>
            <Grid container spacing={0} sx={{ mx: 2 }}>
              <Grid item xs={10}>
                <Grid container spacing={0}>
                  <Grid item xs={4} md={1}>
                    <item>206.</item>
                  </Grid>
                  <Grid item xs={11}>
                    <item>
                      <Typography>H.Yoot,M.Mahatot</Typography>
                      <Typography>Janus</Typography>
                      <Typography>
                        <Link href="#">Link</Link>,heloo
                      </Typography>
                    </item>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4} md={1} sx={{ my: 2 }}>
                <item>
                  <Button>Schematic</Button>
                </item>
              </Grid>
            </Grid>
          </Card>

          <Card sx={{ my: 2 }}>
            <Grid container spacing={0} sx={{ mx: 2 }}>
              <Grid item xs={10}>
                <Grid container spacing={0}>
                  <Grid item xs={4} md={1}>
                    <item>207.</item>
                  </Grid>
                  <Grid item xs={11}>
                    <item>
                      <Typography>H.Yoot,M.Mahatot</Typography>
                      <Typography>Janus</Typography>
                      <Typography>
                        <Link href="#">Link</Link>,heloo
                      </Typography>
                    </item>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4} md={1} sx={{ my: 2 }}>
                <item>
                  <Button>Schematic</Button>
                </item>
              </Grid>
            </Grid>
          </Card>
          <Card sx={{ my: 2 }}>
            <Grid container spacing={0} sx={{ mx: 2 }}>
              <Grid item xs={10}>
                <Grid container spacing={0}>
                  <Grid item xs={4} md={1}>
                    <item>208.</item>
                  </Grid>
                  <Grid item xs={11}>
                    <item>
                      <Typography>H.Yoot,M.Mahatot</Typography>
                      <Typography>Janus</Typography>
                      <Typography>
                        <Link href="#">Link</Link>,heloo
                      </Typography>
                    </item>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4} md={1} sx={{ my: 2 }}>
                <item>
                  <Button>Schematic</Button>
                </item>
              </Grid>
            </Grid>
          </Card>

          <Card sx={{ my: 2 }}>
            <Grid container spacing={0} sx={{ mx: 2 }}>
              <Grid item xs={10}>
                <Grid container spacing={0}>
                  <Grid item xs={4} md={1}>
                    <item>209.</item>
                  </Grid>
                  <Grid item xs={11}>
                    <item>
                      <Typography>H.Yoot,M.Mahatot</Typography>
                      <Typography>Janus</Typography>
                      <Typography>
                        <Link href="#">Link</Link>,heloo
                      </Typography>
                    </item>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4} md={1} sx={{ my: 2 }}>
                <item>
                  <Button>Schematic</Button>
                </item>
              </Grid>
            </Grid>
          </Card>

          <Card sx={{ my: 2 }}>
            <Grid container spacing={0} sx={{ mx: 2 }}>
              <Grid item xs={10}>
                <Grid container spacing={0}>
                  <Grid item xs={4} md={1}>
                    <item>210.</item>
                  </Grid>
                  <Grid item xs={11}>
                    <item>
                      <Typography>
                        H. Yoo†, M. Mahato†, J. -S. Kim, S. Oh, M. Garai, V. H. Nguyen, A. K. Taseer, M. -J. Lee, I. -K.
                        Oh *
                      </Typography>
                      <Typography variant="subtitle2">
                        Janus CoMOF-SEBS Membrane for Bifunctional Dielectric Layer in Triboelectric Nanogenerators
                      </Typography>
                      <Typography variant="subtitle2">
                        <Link href="#">Advanced Science (IF=17.521)</Link>,ACCEPTED
                      </Typography>
                    </item>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4} sx={{ my: 2 }} md={1}>
                <item>
                  <Button>Schematic</Button>
                </item>
              </Grid>
            </Grid>
          </Card>
        </RootStyle>
      )}
    </Page>
  );
}
