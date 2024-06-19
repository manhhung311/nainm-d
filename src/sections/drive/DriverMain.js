import React, { useEffect, useState } from 'react';
import { Card, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import { loader } from 'graphql.macro';
import { useMutation, useQuery } from '@apollo/client';
import { useSnackbar } from 'notistack';
import useLocales from '../../locals/useLocals';
import useResponsive from '../../hooks/useResponsive';
import { StatusCollection, TypeCollection } from '../../constant';
import DriverCard from './DriverCard';

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: Number(theme.shape.borderRadius) * 2,
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(5),
  },
}));

const LIST_ALL_DRIVER = loader('../../graphql/queries/collections/ListCollections.graphql');
const DELETE_COLLECTION = loader('../../graphql/mutations/collections/deleteCollection.graphql');
const EDIT_STATUS_COLLECTION = loader('../../graphql/mutations/collections/editCollection.graphql');

export default function DriverMain() {
  const { t, currentLang } = useLocales();

  const { enqueueSnackbar } = useSnackbar();

  const isMobile = useResponsive('between', 'xs', 'xs', 'sm');

  const [driver, setDriver] = useState([]);

  const { data: getAllPosts, refetch } = useQuery(LIST_ALL_DRIVER, {
    variables: {
      input: {
        status_collection: StatusCollection.Draft,
        type_collection: TypeCollection.Driver,
        page: 1,
        limit: 999,
      },
    },
  });

  useEffect(() => {
    if (getAllPosts) {
      setDriver(getAllPosts?.collections);
    }
  }, [getAllPosts]);

  const dataFiltered = applySortFilter({
    tableData: driver,
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

  return (
    <RootStyle>
      <Grid container spacing={5} alignItems="center">
        {isMobile ? (
          <Grid item xs={12} sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex', pb: 3 }}>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="h4"> {t('driver.title')}</Typography>
            </Stack>
          </Grid>
        ) : (
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="h4"> {t('driver.title')}</Typography>
            </Stack>
          </Grid>
        )}
      </Grid>

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
              <DriverCard
                post={post}
                index={index}
                handleDeleteDriver={handleDeleteCollection}
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
