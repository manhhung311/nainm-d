import { Box, Grid, Typography, Divider, Button, Link, Tooltip, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { alpha, styled } from '@mui/material/styles';
import EditSharpIcon from '@mui/icons-material/EditSharp';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/client';
import Image from '../../components/Image';
import { _studentData } from '../../_mock/_student';
import { PATH_DASHBOARD } from '../../routes/paths';
import useLocales from '../../locals/useLocals';
import { getComparator } from '../../hooks/useTable';
import { roleChangeNumber } from '../../constant';
import Iconify from '../../components/Iconify';
// ----------------------------------------------------------------------

const ListUsers = loader('../../graphql/queries/user/ListUsers.graphql');

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: Number(theme.shape.borderRadius) * 2,
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(5),
  },
}));
// ----------------------------------------------------------------------
export default function Students({ idProfessor, id }) {
  const [tableData, setTableData] = useState([]);

  const { data: allUsers } = useQuery(ListUsers);

  const { pathname } = useLocation();

  const isDashboard = pathname.includes('dashboard');

  const { t } = useLocales();

  const navigate = useNavigate();

  useEffect(() => {
    if (allUsers) {
      setTableData(allUsers?.users);
    }
  }, [allUsers]);

  const dataFiltered = applySortFilter({
    tableData,
  });
  console.log('dataFiltered', dataFiltered);
  const handleLinkTo = (id) => PATH_DASHBOARD.profile.detail(id);
  return (
    <RootStyle>
      <Box>
        {dataFiltered?.map((item, index) => (
          <div key={index}>
            <Divider sx={{ mb: 5 }} />
            {isDashboard ? (
              <Grid container>
                <Grid item xs={12} sx={{ justifyContent: 'right', alignItems: 'right', display: 'flex' }}>
                  <Tooltip title={t('people.edit')} placement="top">
                    <IconButton color="success" component={RouterLink} to={PATH_DASHBOARD.profile.edit(idProfessor)}>
                      <EditSharpIcon sx={{ width: 20, height: 20 }} />
                    </IconButton>
                  </Tooltip>
                  {/* <Button */}
                  {/*  variant="outlined" */}
                  {/*  startIcon={<EditSharpIcon />} */}
                  {/*  component={RouterLink} */}
                  {/*  to={PATH_DASHBOARD.profile.edit(idProfessor)} */}
                  {/* > */}
                  {/*  {t('people.edit')} */}
                  {/* </Button> */}
                </Grid>
              </Grid>
            ) : (
              <></>
            )}
            <Grid container sx={{ justifyContent: 'center', display: 'flex', mb: 4 }} spacing={5} key={index}>
              <Grid item xs={6} md={2}>
                <Image alt="preview" src={item.avartaURL} ratio="3/4" sx={{ borderRadius: 2 }} />
              </Grid>
              <Grid item xs={12} md={10}>
                <Link to={handleLinkTo(Number(item.id))} color="inherit" component={RouterLink}>
                  <Typography variant="h6">{item.fullName}</Typography>
                </Link>
                <Box sx={{ m: 3, ml: 0 }}>
                  <Typography>
                    ★ {t('people.email')}: {item?.email}
                  </Typography>
                </Box>
                <Box>
                  <Typography>
                    ★ {t('people.phone')}: {item?.phoneNumber}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </div>
        ))}
      </Box>
    </RootStyle>
  );
}
function applySortFilter({ tableData }) {
  tableData = tableData.filter((item) => item.type_user !== 0);

  return tableData;
}
