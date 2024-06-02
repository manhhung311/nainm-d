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
import { TypeCollection } from '../../constant';
import useTabs from '../../hooks/useTabs';
import useLocales from '../../locals/useLocals';
import PublicationPostCard from './PublicationCard';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import TapNewEditDialog from '../tap-form/TapNewEditDialog';
import TapListDialog from '../tap-form/TapListDialog';
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

  const [isOpen, setIsOpen] = useState(false);

  const [isOpenList, setIsOpenList] = useState(false);

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
    tableData: currentTab?.collection ?? [],
    filterLanguage: currentLang.value,
  });

  console.log('currentTab', currentTab);
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
        input: {
          id: Number(idCollection),
        },
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

  const handleCloseEditDialog = () => {
    setIsOpen(false);
  };

  const handleOpenEditDialog = () => {
    setIsOpen(true);
  };

  const handleCloseListDialog = () => {
    setIsOpenList(false);
  };

  const handleOpenListDialog = () => {
    setIsOpenList(true);
  };

  console.log('info', info);

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
          <Box>
            <Button variant="contained" onClick={handleOpenListDialog} sx={{ mr: 1 }}>
              Quản lí danh sách
            </Button>
            <Button variant="contained" onClick={handleOpenEditDialog}>
              Quản lí tap
            </Button>
          </Box>
        </Stack>
      )}

      {info && info.length === 0 && (
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
        {info &&
          info.length > 0 &&
          info.map((nameTap, index) => (
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

      <Typography variant="h5">{currentLang.value === 'vi' ? currentTab?.name : currentTab?.nameElg}</Typography>

      <Typography variant="body2" sx={{ mb: 5 }}>
        {currentLang.value === 'vi' ? currentTab?.description : currentTab?.descriptionElg}
      </Typography>

      {info && info.length > 0 && dataFiltered.length === 0 && (
        <Card sx={{ pt: 3, px: 5, minHeight: 100, mt: 3 }}>
          <Typography textAlign={'center'} variant="h6">
            {t('card.noPostsYet')}
          </Typography>
        </Card>
      )}

      <Grid container spacing={3}>
        {dataFiltered.length > 0 &&
          dataFiltered.map((post, index) => (
            <Grid key={post?.id} item xs={12}>
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

      <TapNewEditDialog
        onClose={handleCloseEditDialog}
        isOpen={isOpen}
        row={null}
        refetchData={refetch}
        tap={info}
        typeCollection={TypeCollection.Publication}
      />

      <TapListDialog
        idCurrentTap={Number(currentTab?.id)}
        onClose={handleCloseListDialog}
        isOpen={isOpenList}
        row={null}
        refetchData={refetch}
        tap={info}
        typeCollection={TypeCollection.Publication}
      />
    </RootStyle>
  );
}

function applySortFilter({ tableData, filterLanguage }) {
  if (filterLanguage === 'en') {
    tableData = tableData.filter((item) => item?.title_english !== '');
  }
  if (filterLanguage === 'vi') {
    tableData = tableData.filter((item) => item?.title !== '');
  }
  return tableData;
}
