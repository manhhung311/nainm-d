import React, { useEffect, useState } from 'react';
import { Button, Card, Stack, Tab, Tabs, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/client';
import Label from '../../components/Label';
import useLocales from '../../locals/useLocals';
import useResponsive from '../../hooks/useResponsive';
import useAuth from '../../hooks/useAuth';
import { PATH_DASHBOARD } from '../../routes/paths';
import Iconify from '../../components/Iconify';
import { TypeCollection } from '../../constant';
import useTabs from '../../hooks/useTabs';
import FacilityPostCard from './FacilityCard';

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: Number(theme.shape.borderRadius) * 2,
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(5),
  },
}));
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
const LIST_ALL_FACILITY = loader('../../graphql/queries/collections/ListCollections.graphql');

export default function FacilityMain() {
  const { t } = useLocales();

  const { user } = useAuth();

  const [facility, setFacility] = useState([]);

  const { currentTab: filterStatus, onChangeTab: onFilterStatus } = useTabs(1);

  const { data: getAllPosts } = useQuery(LIST_ALL_FACILITY, {
    variables: {
      input: {
        status_collection: filterStatus,
        type_collection: TypeCollection.Facility,
      },
    },
  });
  useEffect(() => {
    if (getAllPosts) {
      setFacility(getAllPosts?.collections);
    }
  }, [getAllPosts]);

  const isMobile = useResponsive('between', 'xs', 'xs', 'sm');

  return (
    <RootStyle>
      <Grid container spacing={5} alignItems="center">
        {isMobile ? (
          <>
            <Grid item xs={7}>
              <Typography variant="h4">{t('facility.title')}</Typography>
            </Grid>
            <Grid item xs={5}>
              <Stack>
                {user && (
                  <Button
                    variant="contained"
                    component={RouterLink}
                    to={PATH_DASHBOARD.facility.new}
                    startIcon={<Iconify icon={'eva:plus-fill'} />}
                  >
                    Tạo mới
                  </Button>
                )}
              </Stack>
            </Grid>
          </>
        ) : (
          <>
            <Grid item xs={10}>
              <Typography variant="h4">{t('facility.title')}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Stack>
                {user && (
                  <Button
                    variant="contained"
                    component={RouterLink}
                    to={PATH_DASHBOARD.facility.new}
                    startIcon={<Iconify icon={'eva:plus-fill'} />}
                  >
                    Tạo mới
                  </Button>
                )}
              </Stack>
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

      {facility.length === 0 && (
        <Card sx={{ pt: 3, px: 5, minHeight: 100, mt: 3 }}>
          <Typography textAlign={'center'} variant="h6">
            Chưa có bài viết nào
          </Typography>
        </Card>
      )}

      <Grid container spacing={3}>
        {facility.length > 0 &&
          facility.map((post, index) => (
            <Grid key={post?.id} item xs={12} sm={6} md={4}>
              <FacilityPostCard post={post} index={index} />
            </Grid>
          ))}
      </Grid>
    </RootStyle>
  );
}
