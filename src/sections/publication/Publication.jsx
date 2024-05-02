// @mui
import { useQuery } from '@apollo/client';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import { loader } from 'graphql.macro';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link as RouterLink } from 'react-router-dom';
import { PATH_DASHBOARD } from '../../routes/paths';
import Iconify from '../../components/Iconify';
import useAuth from '../../hooks/useAuth';
import useResponsive from '../../hooks/useResponsive';
import Label from '../../components/Label';
import { TypeCollection } from '../../constant';
import useTabs from '../../hooks/useTabs';
import useLocales from '../../locals/useLocals'

// components

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(10),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing( 7),
  },
}));
// ----------------------------------------------------------------------

const TABS = [
  {
    value: 1,
    label: 'Công bố',
    color: 'success',
  },
  {
    value: 0,
    label: 'Chờ Duyệt',
    color: 'info',
  },
  {
    value: 2,
    label: 'Ẩn',
    color: 'default',
  },
];
const top100Films = [
  { label: 'The Godfather', id: 1 },
  { label: 'Pulp Fiction', id: 2 },
];
const LIST_ALL_PUBLICATION = loader('../../graphql/queries/collections/ListCollections.graphql');

export default function Publiction() {
  const navigate = useNavigate();
  const { t } = useLocales();
  const { user } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { currentTab: filterStatus, onChangeTab: onFilterStatus } = useTabs(1);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleEditBlog = (id) => {
    navigate(PATH_DASHBOARD.publication.edit(id));
  };
  const handleDetailPublication = (id) => {
    navigate(PATH_DASHBOARD.publication.detail(id));
  };
  const { pathname } = useLocation();

  const isDashboard = pathname.includes('dashboard');
  const [info, setInfo] = useState([]);
  const { data: collection } = useQuery(LIST_ALL_PUBLICATION, {
    variables: {
      input: {
        status_collection: filterStatus,
        type_collection: TypeCollection.Publication,
      },
    },
  });
  console.log('collection', collection);
  useEffect(() => {
    if (collection) {
      setInfo(collection?.collections);
    }
  }, [collection]);

  const isMobile = useResponsive('between', 'xs', 'xs', 'sm');

  return (
    <RootStyle>
      <Grid container spacing={5} alignItems="center">
        {isMobile ? (
          <>
          <Grid item xs={7}>
            <Typography variant="h4">{t('publication.publication')}</Typography>
          </Grid>

          <Grid item xs={5}>
            <Stack>
              {user && (
                <Button
                  variant="contained"
                  component={RouterLink}
                  to={PATH_DASHBOARD.research.new}
                  startIcon={<Iconify icon={'eva:plus-fill'} />}
                >
                  Tạo mới
                </Button>
              )}
            </Stack>
          </Grid>
          <Grid item xs={12} md={3}>
          <Autocomplete 
  disablePortal
  id="combo-box-demo"
  options={top100Films}

  sx={{ width: 300,my:2 }}
  renderInput={(params) => <TextField {...params} label="Search" />}
/>
          </Grid>
        </>
        ) : (
          <>
            <Grid item xs={10}>
              <Typography variant="h4">{t('publication.publication')}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Stack>
                {user && (
                  <Button
                    variant="contained"
                    component={RouterLink}
                    to={PATH_DASHBOARD.publication.new}
                    startIcon={<Iconify icon={'eva:plus-fill'} />}
                  >
                    Tạo mới
                  </Button>
                )}
              </Stack>
            </Grid>
            <Grid item xs={12} md={3}>
            <Autocomplete 
  disablePortal
  id="combo-box-demo"
  options={top100Films}

  sx={{ width: 300,my:2 }}
  renderInput={(params) => <TextField {...params} label="Search" />}
/>
            </Grid>
          </>
          
        )}
      </Grid>
      <Tabs
        allowScrollButtonsMobile
        variant="scrollable"
        scrollButtons="auto"
        value={filterStatus}
        onChange={onFilterStatus}
        sx={{ mb: { xs: 3, md: 5 } }}
      >
        {TABS.map((tab, idx) => (
          <Tab
            disableRipple
            key={idx + 1}
            value={tab.value}
            label={
              <Stack spacing={1} direction="row" alignItems="center">
                <div>{tab.label}</div> <Label color={tab.color}> </Label>
              </Stack>
            }
          />
        ))}
      </Tabs>
      {info.map((item, index) => (
        <Card sx={{ my: 2, padding: 2, backgroundColor: '#e0e0e0' }}>
          <Grid container spacing={0}>
            <Grid item xs={10}>
              <Grid container spacing={0}>
                <Grid
                  item
                  xs={4}
                  md={1}
                  sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', textAlign: 'center' }}
                >
                  <item>{item.id}</item>
                </Grid>
                <Grid item xs={11}>
                  <item>
                    <Typography variant="subtitle2">{item.title}</Typography>
                    <Typography>{item.description}</Typography>
                  </item>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4} sx={{ my: 2 }} md={1}>
              <item>
                <Button
                  id="demo-positioned-button"
                  aria-controls={open ? 'demo-positioned-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                  style={{ color: '#333' }}
                >
                  <MoreVertOutlinedIcon />
                </Button>
                <Menu
                  id="demo-positioned-menu"
                  aria-labelledby="demo-positioned-button"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                >
                  <MenuItem onClick={() => handleDetailPublication(item.id)}>Detail</MenuItem>
                  <MenuItem onClick={() => handleEditBlog(item.id)}>Edit</MenuItem>
                  <MenuItem onClick={handleClose}>Delete</MenuItem>
                </Menu>
              </item>
            </Grid>
          </Grid>
        </Card>
      ))}
    </RootStyle>
  );
}
