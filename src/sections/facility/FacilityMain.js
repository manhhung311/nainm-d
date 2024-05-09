import React, { useEffect, useState } from 'react';
import { Button, Card, Stack, Tab, Tabs, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import { loader } from 'graphql.macro';
import { useMutation, useQuery } from '@apollo/client';
import { useSnackbar } from 'notistack';
import useLocales from '../../locals/useLocals';
import useResponsive from '../../hooks/useResponsive';
import useAuth from '../../hooks/useAuth';
import { PATH_DASHBOARD } from '../../routes/paths';
import Iconify from '../../components/Iconify';
import { TypeCollection } from '../../constant';
import useTabs from '../../hooks/useTabs';
import FacilityCard from './FacilityCard';

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
    label: 'publish',
    color: 'success',
  },
  {
    value: 0,
    label: 'waitForApproval',
    color: 'info',
  },
  {
    value: 2,
    label: 'hidden',
    color: 'default',
  },
];

const LIST_ALL_FACILITY = loader('../../graphql/queries/collections/ListCollections.graphql');
const DELETE_COLLECTION = loader('../../graphql/mutations/collections/deleteCollection.graphql');
const EDIT_STATUS_COLLECTION = loader('../../graphql/mutations/collections/editCollection.graphql');

export default function FacilityMain() {
  const { t, currentLang } = useLocales();

  const { enqueueSnackbar } = useSnackbar();

  const { user } = useAuth();

  const [facility, setFacility] = useState([]);

  const { currentTab: filterStatus, onChangeTab: onFilterStatus } = useTabs(1);

  const { data: getAllPosts, refetch } = useQuery(LIST_ALL_FACILITY, {
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

  const dataFiltered = applySortFilter({
    tableData: facility,
    filterLanguage: currentLang.value,
  });

  const isMobile = useResponsive('between', 'xs', 'xs', 'sm');

  const [deleteCollection] = useMutation(DELETE_COLLECTION, {
    onCompleted: () => {
      enqueueSnackbar(t('message.Successful deletion of news'), {
        variant: 'success',
      });
    },

    onError: (error) => {
      enqueueSnackbar(`${t('message.Deleting news failed. Cause')} ${error.message}`, {
        variant: 'error',
      });
    },
  });

  const [editStatusCollection] = useMutation(EDIT_STATUS_COLLECTION, {
    onCompleted: () => {
      enqueueSnackbar(t('message.Successful status update!'), {
        variant: 'success',
      });
    },
    onError: (error) => {
      enqueueSnackbar(`${t('Status update failed!. Cause:')} ${error.message}`, {
        variant: 'error',
      });
    },
  });

  const handleDeleteCollection = async (idCollection) => {
    await deleteCollection({
      variables: {
        id: Number(idCollection),
      },
    });
    await refetch();
  };

  const handleEditStatusCollection = async (id, statusId) => {
    await editStatusCollection({
      variables: {
        input: {
          id,
          status: statusId,
        },
      },
    });

    await refetch();
  };

  return (
    <RootStyle>
      <Grid container spacing={5} alignItems="center">
        {isMobile ? (
          <Grid item xs={12} sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="h4"> {t('facility.title')}</Typography>
              {user && (
                <Button
                  variant="contained"
                  component={RouterLink}
                  to={PATH_DASHBOARD.facility.new}
                  startIcon={<Iconify icon={'eva:plus-fill'} />}
                >
                  {t('navItem.create')}
                </Button>
              )}
            </Stack>
          </Grid>
        ) : (
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="h4"> {t('facility.title')}</Typography>
              {user && (
                <Button
                  variant="contained"
                  component={RouterLink}
                  to={PATH_DASHBOARD.facility.new}
                  startIcon={<Iconify icon={'eva:plus-fill'} />}
                >
                  {t('navItem.create')}
                </Button>
              )}
            </Stack>
          </Grid>
        )}
      </Grid>

      {user && (
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
                  <div>{t(`card.${tab.label}`)}</div>
                </Stack>
              }
            />
          ))}
        </Tabs>
      )}

      {dataFiltered.length < 1 && (
        <Card sx={{ pt: 3, px: 5, minHeight: 100, mt: 3 }}>
          <Typography textAlign={'center'} variant="h6">
            {t('card.noPostsYet')}
          </Typography>
        </Card>
      )}

      <Grid container spacing={3}>
        {dataFiltered?.length > 0 &&
          dataFiltered.map((post, index) => (
            <Grid key={post?.id} item xs={12} sm={6} md={4}>
              <FacilityCard
                post={post}
                index={index}
                handleDeleteFacility={handleDeleteCollection}
                onEditStatusCollection={handleEditStatusCollection}
                currentLang={currentLang.value}
              />
            </Grid>
          ))}
      </Grid>
    </RootStyle>
  );
}

function applySortFilter({ tableData, filterLanguage }) {
  if (filterLanguage === 'en') {
    tableData = tableData.filter((item) => item.title_english !== '');
  }
  if (filterLanguage === 'vi') {
    tableData = tableData.filter((item) => item.title !== '');
  }
  return tableData;
}
