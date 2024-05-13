import React, { useEffect, useState } from 'react';
import { Card, Stack, Tab, Tabs, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import { loader } from 'graphql.macro';
import { useMutation, useQuery } from '@apollo/client';
import { useSnackbar } from 'notistack';
import useLocales from '../../locals/useLocals';
import useResponsive from '../../hooks/useResponsive';
import { TypeCollection } from '../../constant';
import useTabs from '../../hooks/useTabs';
import NewsCard from './NewsCard';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';

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

const LIST_ALL_NEWS = loader('../../graphql/queries/collections/ListCollections.graphql');
const DELETE_COLLECTION = loader('../../graphql/mutations/collections/deleteCollection.graphql');
const EDIT_STATUS_COLLECTION = loader('../../graphql/mutations/collections/editCollection.graphql');

export default function NewsMain() {
  const { t, currentLang } = useLocales();

  const { enqueueSnackbar } = useSnackbar();

  const [news, setNews] = useState([]);

  const isMobile = useResponsive('between', 'xs', 'xs', 'sm');

  const { pathname } = useLocation();

  const isDashboard = pathname.includes('dashboard');

  const { currentTab: filterStatus, onChangeTab: onFilterStatus } = useTabs(1);

  const { data: getAllPosts, refetch } = useQuery(LIST_ALL_NEWS, {
    variables: {
      input: {
        status_collection: filterStatus,
        type_collection: TypeCollection.News,
        page: 1,
        limit: 999,
      },
    },
  });

  useEffect(() => {
    if (getAllPosts) {
      setNews(getAllPosts?.collections);
    }
  }, [getAllPosts]);

  const dataFiltered = applySortFilter({
    tableData: news,
    filterLanguage: currentLang.value,
  });

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
          <Grid item xs={12} sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex', pb: 3 }}>
            <Typography variant="h4"> {t('news.title')}</Typography>
          </Grid>
        ) : (
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="h4"> {t('news.title')}</Typography>
              {isDashboard ? (
                <></>
              ) : (
                <HeaderBreadcrumbs links={[{ name: t('profile.Home'), href: '/' }, { name: t('news.title') }]} />
              )}
            </Stack>
          </Grid>
        )}
      </Grid>

      {isDashboard && (
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
              <NewsCard
                post={post}
                index={index}
                handleDeleteNews={handleDeleteCollection}
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
