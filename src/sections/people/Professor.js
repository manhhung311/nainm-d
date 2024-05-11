import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, List, ListItem, ListItemIcon, Stack, Typography } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
import { Link as RouterLink } from 'react-router-dom';
import FitbitSharpIcon from '@mui/icons-material/FitbitSharp';
import GrainSharpIcon from '@mui/icons-material/GrainSharp';
import { styled } from '@mui/material/styles';
import { loader } from 'graphql.macro';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import Image from '../../components/Image';
import _mock from '../../_mock';
import { _peopleData } from '../../_mock/_user';
import useResponsive from '../../hooks/useResponsive';
import ProfessorNewPostForm from '../@dashboard/profile/ProfessorNewPostForm';
import Markdown from '../../components/Markdown';
import { Language } from '../../constant';
import useLocales from '../../locals/useLocals';

// ----------------------------------------------------------------------
const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: Number(theme.shape.borderRadius) * 2,
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(5),
  },
}));
// ----------------------------------------------------------------------

const USER_BY_ID = loader('../../graphql/mutations/users/userById.graphql');

Professor.propTypes = {
  idProfessor: PropTypes.number,
};

export default function Professor({ idProfessor }) {
  const isMobile = useResponsive('between', 'xs', 'xs', 'sm');

  const { t, currentLang } = useLocales();

  const [userDetail, setUserDetail] = useState();

  const { data: detailUser } = useQuery(USER_BY_ID, {
    variables: {
      id: idProfessor,
    },
  });

  useEffect(() => {
    if (detailUser) {
      setUserDetail(detailUser?.user);
    }
  }, [detailUser]);

  console.log('userDetail', userDetail);

  return (
    <RootStyle>
      <Box>
        <Grid container spacing={5}>
          <Grid item xs={12} md={3}>
            <Box>
              <Image
                alt="preview"
                src="https://www.chuphinhsanpham.vn/wp-content/uploads/2022/02/chup-hinh-cv-profile-hcm-0004.jpg"
                ratio="4/5"
                sx={{ borderRadius: 2 }}
              />
            </Box>
          </Grid>
          {isMobile ? (
            <Grid item xs={12} md={9} sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
              <Box>
                <Box sx={{ pb: 2, ml: { xs: 10, md: 6 } }}>
                  <h2>BÙI XUÂN TIẾN</h2>
                </Box>
                <Box sx={{ p: 3, pl: { xs: 1, md: 6 } }}>
                  <Typography>★ {_mock.text.title(0)}</Typography>
                  <Typography>★ {_mock.text.title(1)}</Typography>
                </Box>
                <Box sx={{ p: 3, pl: { xs: 1, md: 6 } }}>
                  <Typography>★ {_mock.text.title(2)}</Typography>
                  <Typography>★ {_mock.text.title(3)}</Typography>
                  <Typography>★ {_mock.text.title(4)}</Typography>
                  <Typography>★ {_mock.text.title(5)}</Typography>
                </Box>
                <Stack>
                  <Button
                    sx={{
                      width: 170,
                      ml: { xs: 1, md: 6 },
                      mt: { xs: 0, md: 6, mt: 4 },
                      mb: { xs: 0, md: 1 },
                      bgcolor: '#00FA9A',
                      borderRadius: 20,
                    }}
                    target="_blank"
                    variant="contained"
                    endIcon={<LaunchIcon />}
                    component={RouterLink}
                    href="http://scholar.google.co.kr/citations?user=GJHV48MAAAAJ"
                    to="http://scholar.google.co.kr/citations?user=GJHV48MAAAAJ"
                  >
                    Google Scholar
                  </Button>
                  <Button
                    sx={{ ml: { xs: 1, md: 6 }, mt: { xs: 0, md: 6, mt: 4 } }}
                    variant="textlink"
                    target="_blank"
                    component={RouterLink}
                    href="http://scholar.google.co.kr/citations?user=GJHV48MAAAAJ"
                    to="http://scholar.google.co.kr/citations?user=GJHV48MAAAAJ"
                  >
                    http://scholar.google.co.kr/citations?user=GJHV48MAAAAJ
                  </Button>
                </Stack>
                <Stack>
                  <Button
                    sx={{ width: 170, ml: { xs: 1, md: 6 }, mt: 2, borderRadius: 20 }}
                    target="_blank"
                    variant="contained"
                    endIcon={<LaunchIcon />}
                    component={RouterLink}
                    href="http://www.researcherid.com/rid/B-7121-2011"
                    to="http://www.researcherid.com/rid/B-7121-2011"
                  >
                    Rearcher ID
                  </Button>
                  <Button
                    sx={{ ml: { xs: 1, md: 6 }, mt: 2 }}
                    target="_blank"
                    variant="textlink"
                    component={RouterLink}
                    href="http://www.researcherid.com/rid/B-7121-2011"
                    to="http://www.researcherid.com/rid/B-7121-2011"
                  >
                    http://www.researcherid.com/rid/B-7121-2011
                  </Button>
                </Stack>
              </Box>
            </Grid>
          ) : (
            <Grid item xs={12} md={9}>
              <Box>
                <Box sx={{ pb: 2, ml: { xs: 10, md: 6 } }}>
                  <h2>BÙI XUÂN TIẾN</h2>
                </Box>
                <Box sx={{ p: 3, pl: { xs: 1, md: 6 } }}>
                  <Typography>★ {_mock.text.title(0)}</Typography>
                  <Typography>★ {_mock.text.title(1)}</Typography>
                </Box>
                <Box sx={{ p: 3, pl: { xs: 1, md: 6 } }}>
                  <Typography>★ {_mock.text.title(2)}</Typography>
                  <Typography>★ {_mock.text.title(3)}</Typography>
                  <Typography>★ {_mock.text.title(4)}</Typography>
                  <Typography>★ {_mock.text.title(5)}</Typography>
                </Box>
                <Stack direction="row">
                  <Button
                    sx={{
                      width: 170,
                      ml: { xs: 1, md: 6 },
                      mt: { xs: 0, md: 6, mt: 4 },
                      mb: { xs: 0, md: 1 },
                      bgcolor: '#00FA9A',
                      borderRadius: 20,
                    }}
                    target="_blank"
                    variant="contained"
                    endIcon={<LaunchIcon />}
                    component={RouterLink}
                    href="http://scholar.google.co.kr/citations?user=GJHV48MAAAAJ"
                    to="http://scholar.google.co.kr/citations?user=GJHV48MAAAAJ"
                  >
                    Google Scholar
                  </Button>
                  <Button
                    sx={{ ml: { xs: 1, md: 6 }, mt: { xs: 0, md: 6, mt: 4 } }}
                    variant="textlink"
                    target="_blank"
                    component={RouterLink}
                    href="http://scholar.google.co.kr/citations?user=GJHV48MAAAAJ"
                    to="http://scholar.google.co.kr/citations?user=GJHV48MAAAAJ"
                  >
                    http://scholar.google.co.kr/citations?user=GJHV48MAAAAJ
                  </Button>
                </Stack>
                <Stack direction="row">
                  <Button
                    sx={{ width: 170, ml: { xs: 1, md: 6 }, mt: 2, borderRadius: 20 }}
                    target="_blank"
                    variant="contained"
                    endIcon={<LaunchIcon />}
                    component={RouterLink}
                    href="http://www.researcherid.com/rid/B-7121-2011"
                    to="http://www.researcherid.com/rid/B-7121-2011"
                  >
                    Rearcher ID
                  </Button>
                  <Button
                    sx={{ ml: { xs: 1, md: 6 }, mt: 2 }}
                    target="_blank"
                    variant="textlink"
                    component={RouterLink}
                    href="http://www.researcherid.com/rid/B-7121-2011"
                    to="http://www.researcherid.com/rid/B-7121-2011"
                  >
                    http://www.researcherid.com/rid/B-7121-2011
                  </Button>
                </Stack>
              </Box>
            </Grid>
          )}
        </Grid>
        {currentLang.value === Language.VietNam && <Markdown children={userDetail?.user_information_Vietnamese} />}
        {currentLang.value === Language.English && <Markdown children={userDetail?.user_information_English} />}
      </Box>
    </RootStyle>
  );
}
