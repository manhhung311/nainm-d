import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
// form
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
import { defaultUserOptions } from '../../../constant';
import { PATH_DASHBOARD } from '../../../routes/paths';
import useLocales from '../../../locals/useLocals';
import ProfilePostVNStack from './ProfessorPostVNStack';
import ProfilePostEnglishStack from './ProfessorPostEnglishStack';

// ----------------------------------------------------------------------
const UPDATE_USER = loader('../../../graphql/mutations/users/updUserForAdmin.graphql');

ProfessorNewPostForm.propTypes = {
  isEdit: PropTypes.bool,
  currentUser: PropTypes.object,
  dataPostUpdate: PropTypes.object,
  id: PropTypes.number,
  avartaURL: PropTypes.string,
};

export default function ProfessorNewPostForm({ isEdit, dataPostUpdate }) {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const [currentTab, setCurrentTab] = useState(1);

  const { t } = useLocales();

  const defaultValues = {
    id: dataPostUpdate?.id || null,
    user: defaultUserOptions,
    content: dataPostUpdate?.user_information_Vietnamese || '',
    contentEnglish: dataPostUpdate?.user_information_English || '',
  };

  const methods = useForm({
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  console.log('values', values);

  useEffect(() => {
    if (isEdit && dataPostUpdate) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, dataPostUpdate]);

  // const [createNewFn] = useMutation(CREATE_FACILITY, {
  //   variables: {
  //     input: {},
  //   },
  //   // refetchQueries: () => [
  //   //   {
  //   //     query: LIST_ALL_NEWS,
  //   //     variables: {
  //   //       input: {},
  //   //     },
  //   //   },
  //   // ],
  // });

  const [updateFormUserFn] = useMutation(UPDATE_USER, {
    onCompleted: async (res) => {
      if (res) {
        return res;
      }
      return null;
    },
  });

  const onSubmit = async () => {
    try {
      await updateFormUserFn({
        variables: {
          input: {
            id: Number(values?.id),
            user_information_Vietnamese: values?.content,
            user_information_English: values?.contentEnglish,
          },
        },
      });

      reset();
      enqueueSnackbar(isEdit ? t('message.Successfully edited!') : t('Successful post!'));
      navigate(PATH_DASHBOARD.profile.list);
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
                currentTab === 1
                  ? { backgroundColor: '#4BD578', color: '#fff' }
                  : { backgroundColor: '#fff', color: '#000' }
              }
              className={currentTab === 1 ? 'active' : ''}
            >
              <Typography variant="h5">{t('facility.tab1')}</Typography>
            </Button>
          </Grid>
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
            >
              <Typography variant="h5">{t('facility.tab2')}</Typography>
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={3} sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              {currentTab === 1 ? (
                <ProfilePostVNStack onNext={handleTabClick} />
              ) : (
                <ProfilePostEnglishStack onBack={handleTabClick} />
              )}
            </Card>
          </Grid>
        </Grid>
      </FormProvider>
    </>
  );
}
