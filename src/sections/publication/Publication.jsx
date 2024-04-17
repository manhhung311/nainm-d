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


// ----------------------------------------------------------------------
const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(11),
  },
}));
// ----------------------------------------------------------------------

export default function Publiction() {
  const { pathname } = useLocation();

  const isDashboard = pathname.includes('dashboard');
  return (
    <>
      <Card sx={{ my: 2,
                  mx: 3,
                  padding:2,
                  backgroundColor:'#e0e0e0'
      }}  >
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
                  <Button style = {{backgroundColor:'#333',color:'#fff'}} >Schematic</Button>
                </item>
              </Grid>
            </Grid>
          </Card>

          <Card sx={{ my: 2,
                  mx: 3,
                  padding:2,
                  backgroundColor:'#e0e0e0' }}>
            <Grid container spacing={0} sx={{ mx: 2 }}>
              <Grid item xs={10}>
                <Grid container spacing={0}>
                  <Grid item xs={4} md={1}>
                    <item>211.</item>
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
                  <Button style = {{backgroundColor:'#333',color:'#fff'}} >Schematic</Button>
                </item>
              </Grid>
            </Grid>
          </Card>

          <Card sx={{ my: 2,
                  mx: 3,
                  padding:2,
                  backgroundColor:'#e0e0e0' }}>
            <Grid container spacing={0} sx={{ mx: 2 }}>
              <Grid item xs={10}>
                <Grid container spacing={0}>
                  <Grid item xs={4} md={1}>
                    <item>212.</item>
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
                  <Button style = {{backgroundColor:'#333',color:'#fff'}} >Schematic</Button>
                </item>
              </Grid>
            </Grid>
          </Card>

          <Card sx={{ my: 2,
                  mx: 3,
                  padding:2,
                  backgroundColor:'#e0e0e0' }}>
            <Grid container spacing={0} sx={{ mx: 2 }}>
              <Grid item xs={10}>
                <Grid container spacing={0}>
                  <Grid item xs={4} md={1}>
                    <item>213.</item>
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
                  <Button style = {{backgroundColor:'#333',color:'#fff'}} >Schematic</Button>
                </item>
              </Grid>
            </Grid>
          </Card>

          <Card sx={{ my: 2,
                  mx: 3,
                  padding:2,
                  backgroundColor:'#e0e0e0' }}>
            <Grid container spacing={0} sx={{ mx: 2 }}>
              <Grid item xs={10}>
                <Grid container spacing={0}>
                  <Grid item xs={4} md={1}>
                    <item>214.</item>
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
                  <Button style = {{backgroundColor:'#333',color:'#fff'}} >Schematic</Button>
                </item>
              </Grid>
            </Grid>
          </Card>

          
          <Card sx={{ my: 2,
                  mx: 3,
                  padding:2,
                  backgroundColor:'#e0e0e0' }}>
            <Grid container spacing={0} sx={{ mx: 2 }}>
              <Grid item xs={10}>
                <Grid container spacing={0}>
                  <Grid item xs={4} md={1}>
                    <item>215.</item>
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
                  <Button style = {{backgroundColor:'#333',color:'#fff'}} >Schematic</Button>
                </item>
              </Grid>
            </Grid>
          </Card>

          
          <Card sx={{ my: 2,
                  mx: 3,
                  padding:2,
                  backgroundColor:'#e0e0e0' }}>
            <Grid container spacing={0} sx={{ mx: 2 }}>
              <Grid item xs={10}>
                <Grid container spacing={0}>
                  <Grid item xs={4} md={1}>
                    <item>216.</item>
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
                  <Button style = {{backgroundColor:'#333',color:'#fff'}} >Schematic</Button>
                </item>
              </Grid>
            </Grid>
          </Card>

          
          <Card sx={{ my: 2,
                  mx: 3,
                  padding:2,
                  backgroundColor:'#e0e0e0' }}>
            <Grid container spacing={0} sx={{ mx: 2 }}>
              <Grid item xs={10}>
                <Grid container spacing={0}>
                  <Grid item xs={4} md={1}>
                    <item>217.</item>
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
                  <Button style = {{backgroundColor:'#333',color:'#fff'}} >Schematic</Button>
                </item>
              </Grid>
            </Grid>
          </Card>

          
          <Card sx={{ my: 2,
                  mx: 3,
                  padding:2,
                  backgroundColor:'#e0e0e0' }}>
            <Grid container spacing={0} sx={{ mx: 2 }}>
              <Grid item xs={10}>
                <Grid container spacing={0}>
                  <Grid item xs={4} md={1}>
                    <item>218.</item>
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
                  <Button style = {{backgroundColor:'#333',color:'#fff'}} >Schematic</Button>
                </item>
              </Grid>
            </Grid>
          </Card>
    </>
  );
}
