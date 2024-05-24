// @mui
import { useMutation, useQuery } from '@apollo/client';
import { Box, Button, Typography } from '@mui/material';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { loader } from 'graphql.macro';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useLocation } from 'react-router-dom';
import useResponsive from '../../hooks/useResponsive';
import { TypeCollection, TypeUser } from '../../constant';
import useTabs from '../../hooks/useTabs';
import useLocales from '../../locals/useLocals';
import PublicationPostCard from './PublicationCard';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// components

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: Number(theme.shape.borderRadius) * 2,
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(5),
  },
}));
// ----------------------------------------------------------------------

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
  {
    value: true,
    label: 'standOut',
    color: 'default',
  },
];

const LIST_ALL_PUBLICATION = loader('../../graphql/queries/collections/ListCollections.graphql');
const DELETE_COLLECTION = loader('../../graphql/mutations/collections/deleteCollection.graphql');
const EDIT_STATUS_COLLECTION = loader('../../graphql/mutations/collections/editCollection.graphql');
const LIST_TAP = loader('../../graphql/queries/tap/listTap.graphql');

export default function Publiction() {
  const { t, currentLang } = useLocales();

  const { enqueueSnackbar } = useSnackbar();

  const { currentTab: filterStatus, onChangeTab: onFilterStatus } = useTabs(1);

  const [currentTab, setCurrentTab] = useState(null);

  const { pathname } = useLocation();

  const isDashboard = pathname.includes('dashboard');

  const [info, setInfo] = useState([]);

  const [publicationByTap, setPublicationByTap] = useState([]);

  const { data: collection, refetch } = useQuery(LIST_TAP, {
    variables: {
      input: (() => {
        if (filterStatus === true) {
          return {
            status_collection: 1,
            stand_out: filterStatus,
            type_collection: TypeCollection.Publication,
            page: 1,
            limit: 999,
          };
        }
        return {
          status_collection: filterStatus,
          type_collection: TypeCollection.Publication,
          page: 1,
          limit: 999,
        };
      })(),
    },
  });

  useEffect(() => {
    if (collection) {
      setInfo(collection?.collections_research_publication);
      setCurrentTab(collection?.collections_research_publication?.[0]);
    }
  }, [collection]);

  const dataFiltered = applySortFilter({
    tableData: info,
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

  const handleEditStatusCollection = async (id, statusId, standOut) => {
    await editStatusCollection({
      variables: {
        input: {
          id,
          ...(standOut === false ? { stand_out: standOut } : { status: statusId }),
          ...(standOut === true && { stand_out: standOut }),
        },
      },
    });

    await refetch();
  };

  console.log('dataFiltered?.[0]?.collection', dataFiltered?.[0]?.collection);
  console.log('publicationByTap', publicationByTap);
  console.log('currentTab', currentTab);

  return (
    <RootStyle>
      <Grid container spacing={5} alignItems="center">
        {isMobile ? (
          <>
            <Grid item xs={12} sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex', pb: 3 }}>
              <Typography variant="h4">{t('publication.publication')}</Typography>
            </Grid>
          </>
        ) : (
          <>
            <Grid item xs={12}>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="h4">{t('publication.publication')}</Typography>
                <HeaderBreadcrumbs links={[{ name: t('profile.Home'), href: '/' }, { name: t('publication.title') }]} />
              </Stack>
            </Grid>
          </>
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

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {info &&
          info.length > 0 &&
          info.map((nameTap, index) => (
            <Button
              key={index}
              sx={{
                flex: {
                  xs: '1 0 100%',
                  sm: '1 0 50%',
                  md: '1 0 33%',
                },
                borderRadius: 0,
              }}
              size="large"
              variant="outlined"
              style={
                Number(currentTab?.id) === Number(nameTap?.id)
                  ? { backgroundColor: '#4BD578', color: '#fff' }
                  : { backgroundColor: '#fff', color: '#000' }
              }
              onClick={() => {
                setPublicationByTap(nameTap?.collection);
                setCurrentTab(nameTap);
              }}
            >
              <Typography variant="h5" noWrap>
                {nameTap.name}
              </Typography>
            </Button>
          ))}
      </Box>

      {dataFiltered.length === 0 && (
        <Card sx={{ pt: 3, px: 5, minHeight: 100, mt: 3 }}>
          <Typography textAlign={'center'} variant="h6">
            {t('card.noPostsYet')}
          </Typography>
        </Card>
      )}

      <Grid container spacing={3}>
        {currentTab?.collection?.length > 0 &&
          currentTab?.collection.map((post, index) => (
            <Grid key={post?.id} item xs={12} sm={6} md={4}>
              <PublicationPostCard
                post={post}
                index={index}
                handleDeletePublication={handleDeleteCollection}
                onEditStatusCollection={handleEditStatusCollection}
                currentLang={currentLang.value}
                standOut={filterStatus}
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
