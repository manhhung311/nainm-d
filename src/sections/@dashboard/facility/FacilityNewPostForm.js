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
import React, { useCallback, useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { FormProvider } from '../../../components/hook-form';
import { TypeCollection } from '../../../constant';
import { PATH_DASHBOARD } from '../../../routes/paths';
import useLocales from '../../../locals/useLocals';
import FacilityPostVNStack from './FacilityPostVNStack';
import FacilityPostEnglishStack from './FacilityPostEnglishStack';

// ----------------------------------------------------------------------
const CREATE_FACILITY = loader('../../../graphql/mutations/collections/createCollection.graphql');
const UPDATE_FACILITY = loader('../../../graphql/mutations/collections/editCollection.graphql');

FacilityNewPostForm.propTypes = {
  isEdit: PropTypes.bool,
  dataPostUpdate: PropTypes.object,
};

export default function FacilityNewPostForm({ isEdit, dataPostUpdate }) {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const [currentTab, setCurrentTab] = useState(1);

  const [uploadFile, setUploadFile] = useState(null);

  const { t } = useLocales();

  const NewQuotationSchema = Yup.object()
    .shape({
      title: Yup.string().max(200, t('message.Titles have a maximum number of 200 characters!')),
      titleEnglish: Yup.string().max(200, t('message.Titles have a maximum number of 200 characters!')),
    })
    .test('titleEnglish', null, (obj) => {
      if (obj.title.length !== 0 || obj.titleEnglish.length !== 0) {
        return true;
      }

      return new Yup.ValidationError(
        t('message.You must fill in at least 1 of 2 Vietnamese or English sections!'),
        null,
        'titleEnglish'
      );
    });

  const defaultValues = {
    id: dataPostUpdate?.id || null,
    title: dataPostUpdate?.title || '',
    description: dataPostUpdate?.description || '',
    content: dataPostUpdate?.collection_Vietnamese || '',
    titleEnglish: dataPostUpdate?.title_english || '',
    descriptionEnglish: dataPostUpdate?.description_english || '',
    contentEnglish: dataPostUpdate?.collection_English || '',
    cover: dataPostUpdate?.imgURL || null,
  };

  const methods = useForm({
    resolver: yupResolver(NewQuotationSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    setValue,
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

  const [createNewFn] = useMutation(CREATE_FACILITY, {
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

  const [updateFacilityFn] = useMutation(UPDATE_FACILITY, {
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
              type_collection: TypeCollection.Facility,
              title: values?.title,
              imgURL: uploadFile,
              collection_Vietnamese: values?.content,
              description: values?.description,
              title_english: values?.titleEnglish,
              collection_English: values?.contentEnglish,
              description_english: values?.descriptionEnglish,
            },
          },
        });
      } else {
        await updateFacilityFn({
          variables: {
            input: {
              // check chuẩn kiểu dữ liệu của input
              id: Number(values?.id),
              title: values?.title,
              imgURL: uploadFile,
              collection_Vietnamese: values?.content,
              description: values?.description,
              title_english: values?.titleEnglish,
              collection_English: values?.contentEnglish,
              description_english: values?.descriptionEnglish,
            },
          },
        });
      }
      reset();
      enqueueSnackbar(isEdit ? t('message.Successfully edited!') : t('message.Successful post!'));
      navigate(PATH_DASHBOARD.facility.list);
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

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          'cover',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
      setUploadFile(file);
    },
    [setValue]
  );

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
                <FacilityPostVNStack onNext={handleTabClick} onDrop={handleDrop} />
              ) : (
                <FacilityPostEnglishStack onBack={handleTabClick} onDrop={handleDrop} />
              )}
            </Card>
          </Grid>
        </Grid>
      </FormProvider>
    </>
  );
}
