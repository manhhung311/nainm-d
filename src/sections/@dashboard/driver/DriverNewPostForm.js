import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { Button, Card, Grid, Typography } from '@mui/material';
// routes
// components
import PropTypes from 'prop-types';
import { loader } from 'graphql.macro';
import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { FormProvider } from '../../../components/hook-form';
import { TypeCollection } from '../../../constant';
import { PATH_DASHBOARD } from '../../../routes/paths';
import useLocales from '../../../locals/useLocals';
import DriverPostEnglishStack from './DriverPostEnglishStack';

// ----------------------------------------------------------------------
const CREATE_DRIVER = loader('../../../graphql/mutations/collections/createCollection.graphql');
const UPDATE_DRIVER = loader('../../../graphql/mutations/collections/editCollection.graphql');

DriverNewPostForm.propTypes = {
  isEdit: PropTypes.bool,
  dataPostUpdate: PropTypes.object,
};

export default function DriverNewPostForm({ isEdit, dataPostUpdate }) {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const [currentTab, setCurrentTab] = useState(1);

  const { t } = useLocales();

  const NewQuotationSchema = Yup.object().shape({
    title: Yup.string()
      .max(200, t('message.Titles have a maximum number of 200 characters!'))
      .required(t('url.error1')),
    description: Yup.string().url(t('url.error2')).required(t('url.error1')),
  });
  const defaultValues = {
    id: dataPostUpdate?.id || null,
    title: dataPostUpdate?.title || '',
    description: dataPostUpdate?.description || '',
    titleEnglish: dataPostUpdate?.title_english || '',
    descriptionEnglish: dataPostUpdate?.description_english || '',
  };

  const methods = useForm({
    resolver: yupResolver(NewQuotationSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (isEdit && dataPostUpdate) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, dataPostUpdate]);

  const [createNewFn] = useMutation(CREATE_DRIVER, {
    variables: {
      input: {},
    },
    // refetchQueries: () => [
    //   {
    //     query: LIST_ALL_NEWS,
    //     variables: {
    //       input: {},
    //     },
    //   },
    // ],
  });

  const [updateDriverFn] = useMutation(UPDATE_DRIVER, {
    onCompleted: async (res) => {
      if (res) {
        return res;
      }
      return null;
    },
  });

  const onSubmit = async () => {
    try {
      if (!isEdit) {
        await createNewFn({
          variables: {
            input: {
              // check chuẩn kiểu dữ liệu của input
              type_collection: TypeCollection.Driver,
              title: values?.title,
              description: values?.description,
              title_english: values?.title,
              description_english: values?.description,
            },
          },
        });
      } else {
        await updateDriverFn({
          variables: {
            input: {
              // check chuẩn kiểu dữ liệu của input
              id: Number(values?.id),
              title: values?.title,
              description: values?.description,
              title_english: values?.title,
              description_english: values?.description,
            },
          },
        });
      }
      reset();
      enqueueSnackbar(isEdit ? t('message.Successfully edited!') : t('message.Successful post!'));
      navigate(PATH_DASHBOARD.drive.list);
    } catch (error) {
      enqueueSnackbar(isEdit ? t('message.Failed post fix!') : t('message.Post failed!'), { variant: 'error' });
    }
  };

  useEffect(() => {
    if (isSubmitting && values?.title === '' && values?.titleEnglish === '') {
      enqueueSnackbar(t('message.You must fill in at least 1 of 2 Vietnamese or English sections!'), {
        variant: 'error',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitting, values]);

  const handleTabClick = (tabIndex) => {
    setCurrentTab(tabIndex);
  };

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{ mb: 4, mt: 1 }}>
          <Grid item xs={6} md={3} sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
            <Button
              sx={{ width: '100%', height: '100%', borderRadius: 2 }}
              size="large"
              variant="outlined"
              style={
                currentTab === 2
                  ? { backgroundColor: '#4BD578', color: '#fff' }
                  : { backgroundColor: '#fff', color: '#000' }
              }
              className={currentTab === 2 ? 'active' : ''}
              disabled
            >
              <Typography variant="h5">Drive</Typography>
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={3} sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <DriverPostEnglishStack onBack={handleTabClick} />
            </Card>
          </Grid>
        </Grid>
      </FormProvider>
    </>
  );
}
