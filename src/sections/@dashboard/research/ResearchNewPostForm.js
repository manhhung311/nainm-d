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
import ResearchPostVNStack from './ResearchPostVNStack';
import ResearchPostEnglishStack from './ResearchPostEnglishStack';

// ----------------------------------------------------------------------
const CREATE_RESEARCH = loader('../../../graphql/mutations/collections/createCollection.graphql');
const UPDATE_RESEARCH = loader('../../../graphql/mutations/collections/editCollection.graphql');

ResearchNewPostForm.propTypes = {
  isEdit: PropTypes.bool,
  dataPostUpdate: PropTypes.object,
};
export default function ResearchNewPostForm({ isEdit, dataPostUpdate }) {
  // const navigate = useNavigate();

  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const [currentTab, setCurrentTab] = useState(1);

  const { t } = useLocales();

  const NewQuotationSchema = Yup.object()
    .shape({
      title: Yup.string().max(200, 'Tiêu đề có số kí tự tối đa là 200 kí tự!'),
      titleEnglish: Yup.string().max(200, 'Tiêu đề có số kí tự tối đa là 200 kí tự!'),
    })
    .test('titleEnglish', null, (obj) => {
      if (obj.title.length !== 0 || obj.titleEnglish.length !== 0) {
        return true;
      }

      return new Yup.ValidationError(
        'Bạn phải điền nội dung của ít nhất 1 trong 2 phần Việt hoặc Anh!',
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

  const [createResearchFn] = useMutation(CREATE_RESEARCH, {
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

  const [updateResearchFn] = useMutation(UPDATE_RESEARCH, {
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
        await createResearchFn({
          variables: {
            input: {
              // check chuẩn kiểu dữ liệu của input
              type_collection: TypeCollection.Research,
              title: values?.title,
              collection_Vietnamese: values?.content,
              description: values?.description,
              title_english: values?.titleEnglish,
              collection_English: values?.contentEnglish,
              description_english: values?.descriptionEnglish,
            },
          },
        });
      } else {
        await updateResearchFn({
          variables: {
            input: {
              // check chuẩn kiểu dữ liệu của input
              id: Number(values?.id),
              title: values?.title,
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
      enqueueSnackbar(isEdit ? 'Sửa bài thành công!' : 'Đăng bài thành công!');
      navigate(PATH_DASHBOARD.research.list);
    } catch (error) {
      enqueueSnackbar(isEdit ? 'Sửa bài không thành công!' : 'Đăng bài không thành công!', { variant: 'error' });
    }
  };

  useEffect(() => {
    if (isSubmitting && values?.title === '' && values?.titleEnglish === '') {
      enqueueSnackbar('Bạn phải điền nội dung của ít nhất 1 trong 2 phần Việt hoặc Anh', { variant: 'error' });
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
              <Typography variant="h5">{t('research.tab1')}</Typography>
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
              <Typography variant="h5">{t('research.tab2')}</Typography>
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={3} sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              {currentTab === 1 ? (
                <ResearchPostVNStack onNext={handleTabClick} />
              ) : (
                <ResearchPostEnglishStack onBack={handleTabClick} />
              )}
            </Card>
          </Grid>
        </Grid>
      </FormProvider>
    </>
  );
}
