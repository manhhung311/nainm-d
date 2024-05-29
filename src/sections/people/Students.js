import { Box, Divider, Grid, IconButton, Link, Tooltip, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import EditSharpIcon from '@mui/icons-material/EditSharp';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/client';
import PropTypes from 'prop-types';
import Image from '../../components/Image';
import { PATH_DASHBOARD, PATH_PAGE } from '../../routes/paths';
import useLocales from '../../locals/useLocals';
import useAuth from '../../hooks/useAuth';
import { RoleId } from '../../constant';
// ----------------------------------------------------------------------

const ListUsers = loader('../../graphql/queries/user/publicUsers.graphql');

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: Number(theme.shape.borderRadius) * 2,
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(5),
  },
}));
// ----------------------------------------------------------------------

Students.propTypes = {
  typeUser: PropTypes.number.isRequired,
};

export default function Students({ typeUser }) {
  const [tableData, setTableData] = useState([]);

  const { data: allUsers } = useQuery(ListUsers);

  const { user } = useAuth();

  const { pathname } = useLocation();

  const isDashboard = pathname.includes('dashboard');

  const { t } = useLocales();

  useEffect(() => {
    if (allUsers) {
      setTableData(allUsers?.publicUsers);
    }
  }, [allUsers]);

  const dataFiltered = applySortFilter({
    tableData,
    typeUser,
  });
  const handleLinkTo = (id) => (isDashboard ? PATH_DASHBOARD.profile.detail(id) : PATH_PAGE.profile.detail(id));
  const handleLinkToEdit = (id) => PATH_DASHBOARD.profile.edit(id);
  return (
    <RootStyle>
      <Box>
        {dataFiltered?.map((item, index) => (
          <div key={index}>
            <Divider sx={{ mb: 5 }} />
            {isDashboard ? (
              <Grid container>
                <Grid item xs={12} sx={{ justifyContent: 'right', alignItems: 'right', display: 'flex' }}>
                  {user?.role === RoleId.admin && (
                    <Tooltip title={t('people.edit')} placement="top">
                      <IconButton color="success" component={RouterLink} to={handleLinkToEdit(Number(item?.id))}>
                        <EditSharpIcon sx={{ width: 20, height: 20 }} />
                      </IconButton>
                    </Tooltip>
                  )}
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
                <Image alt="preview" src={item.avartaURL} ratio="2/3" sx={{ borderRadius: 2 }} />
              </Grid>
              <Grid item xs={12} md={10}>
                <Link to={handleLinkTo(Number(item?.id))} color="inherit" component={RouterLink}>
                  <Typography variant="h6">{item?.fullName}</Typography>
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
function applySortFilter({ tableData, typeUser }) {
  tableData = tableData.filter((item) => item.type_user === typeUser);

  return tableData;
}
