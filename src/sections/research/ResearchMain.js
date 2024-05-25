import React, { useEffect, useState } from 'react';
import { Box, Button, Card, Stack, Tab, Tabs, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import { loader } from 'graphql.macro';
import { useMutation, useQuery } from '@apollo/client';
import { useSnackbar } from 'notistack';
import { useLocation } from 'react-router-dom';
import useLocales from '../../locals/useLocals';
import useResponsive from '../../hooks/useResponsive';
import useAuth from '../../hooks/useAuth';
import useTabs from '../../hooks/useTabs';
import { TypeCollection } from '../../constant';
import ResearchPostCard from './ResearchCard';
import TapNewEditDialog from '../tap-form/TapNewEditDialog';

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

const DELETE_COLLECTION = loader('../../graphql/mutations/collections/deleteCollection.graphql');
const EDIT_STATUS_COLLECTION = loader('../../graphql/mutations/collections/editCollection.graphql');
const LIST_TAP = loader('../../graphql/queries/tap/listTap.graphql');

export default function ResearchMain() {
  const { t, currentLang } = useLocales();

  const { enqueueSnackbar } = useSnackbar();

  const { user } = useAuth();

  const [research, setResearch] = useState([]);

  const { pathname } = useLocation();

  const isDashboard = pathname.includes('dashboard');

  const isMobile = useResponsive('between', 'xs', 'xs', 'sm');

  const { currentTab: filterStatus, onChangeTab: onFilterStatus } = useTabs(1);

  const [currentTab, setCurrentTab] = useState(null);

  const [isOpen, setIsOpen] = useState(false);

  const { data: getAllPosts, refetch } = useQuery(LIST_TAP, {
    variables: {
      input: {
        status_collection: filterStatus,
        type_collection: TypeCollection.Research,
        page: 1,
        limit: 999,
      },
    },
  });
  useEffect(() => {
    if (getAllPosts) {
      setResearch(getAllPosts?.collections_research_publication);
      setCurrentTab(getAllPosts?.collections_research_publication?.[0]);
    }
  }, [getAllPosts]);

  const dataFiltered = applySortFilter({
    tableData: currentTab?.collection ?? [],
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
        input: {
          id: Number(idCollection),
        },
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

  const handleCloseEditDialog = () => {
    setIsOpen(false);
  };

  const handleOpenEditDialog = () => {
    setIsOpen(true);
  };

  return (
    <RootStyle>
      <Grid container spacing={5} alignItems="center">
        {isMobile ? (
          <>
            <Grid item xs={12}>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="h4"> {t('research.title')}</Typography>
              </Stack>
            </Grid>
          </>
        ) : (
          <>
            <Grid item xs={12}>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="h4"> {t('research.title')}</Typography>
              </Stack>
            </Grid>
          </>
        )}
      </Grid>

      {isDashboard && (
        <Stack direction="row" justifyContent="space-between" sx={{ mb: { xs: 3, md: 5 } }}>
          <Tabs
            allowScrollButtonsMobile
            variant="scrollable"
            scrollButtons="auto"
            value={filterStatus}
            onChange={onFilterStatus}
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

          <Button variant="contained" onClick={handleOpenEditDialog}>
            Quản lí tap
          </Button>
        </Stack>
      )}

      {research && research.length === 0 && (
        <Card sx={{ pt: 3, px: 5, minHeight: 100, mt: 3 }}>
          <Typography textAlign={'center'} variant="h6">
            Không có tap
          </Typography>
        </Card>
      )}

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          mb: { xs: 3, md: 5 },
        }}
      >
        {research &&
          research.length > 0 &&
          research.map((nameTap, index) => (
            <Button
              key={index}
              sx={{
                flex: {
                  xs: '1 0 100%',
                  sm: '1 0 50%',
                  md: '1 0 25%',
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
                setCurrentTab(nameTap);
              }}
            >
              <Typography variant="h5" noWrap>
                {currentLang.value === 'vi' ? nameTap.name : nameTap.nameElg}
              </Typography>
            </Button>
          ))}
      </Box>

      {research && research.length > 0 && dataFiltered.length === 0 && (
        <Card sx={{ pt: 3, px: 5, minHeight: 100, mt: 3 }}>
          <Typography textAlign={'center'} variant="h6">
            {t('card.noPostsYet')}
          </Typography>
        </Card>
      )}

      <Grid container spacing={3}>
        {dataFiltered.length > 0 &&
          dataFiltered.map((post, index) => (
            <Grid key={post?.id} item xs={12} sm={6} md={4}>
              <ResearchPostCard
                post={post}
                index={index}
                handleDeleteResearch={handleDeleteCollection}
                onEditStatusCollection={handleEditStatusCollection}
                currentLang={currentLang.value}
              />
            </Grid>
          ))}
      </Grid>

      <TapNewEditDialog
        onClose={handleCloseEditDialog}
        isOpen={isOpen}
        row={null}
        refetchData={refetch}
        tap={research}
        typeCollection={TypeCollection.Research}
      />
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
