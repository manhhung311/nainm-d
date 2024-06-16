import { useSnackbar } from 'notistack';
import * as Yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import PropTypes from 'prop-types';
import { Button, Card, Grid, Typography } from '@mui/material';
import { useMutation } from '@apollo/client';
import { loader } from 'graphql.macro';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormProvider } from '../../components/hook-form';
import { defaultTapENG, defaultTapVN, TypeCollection } from '../../constant';
import useLocales from '../../locals/useLocals';
import { PATH_DASHBOARD } from '../../routes/paths';
import PublicationPostEnglishStack from './PublicationPostEnglishStack';
import PublicationPostVNStack from './PublicationPostVNStack';

const CREATED_PUBLICATION = loader('../../graphql/mutations/collections/createCollection.graphql');
const UPDATE_PUBLICATION = loader('../../graphql/mutations/collections/editCollection.graphql');

PublicationNewForm.propTypes = {
  isEdit: PropTypes.bool,
  dataPostUpdate: PropTypes.object,
  imgURL: PropTypes.string,
};

export default function PublicationNewForm({ isEdit, dataPostUpdate }) {
  const navigate = useNavigate();

  const [uploadFile, setUploadFile] = useState(null);

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

  const defaultValues = useMemo(
    () => ({
      id: dataPostUpdate?.id || null,
      title: dataPostUpdate?.title || '',
      description: dataPostUpdate?.description || '',
      content: dataPostUpdate?.collection_Vietnamese || '',
      titleEnglish: dataPostUpdate?.title_english || '',
      descriptionEnglish: dataPostUpdate?.description_english || '',
      contentEnglish: dataPostUpdate?.collection_English || '',
      cover: dataPostUpdate?.imgURL || null,
      tapVN: defaultTapVN,
      tapENG: defaultTapENG,
    }),
    [dataPostUpdate]
  );

  const methods = useForm({
    resolver: yupResolver(NewQuotationSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    watch,
    setValue,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  // useEffect(() => {
  //   if (values?.tapVN?.id !== undefined && values.tapVN.id !== values.tapENG.id) {
  //     setValue('tapENG.id', values.tapVN.id, { shouldValidate: false, shouldDirty: false });
  //   }
  // }, [values?.tapVN?.id, values?.tapENG?.id, setValue]);
  //
  // // Sử dụng useEffect để cập nhật id của tapVN khi id của tapENG thay đổi
  // useEffect(() => {
  //   if (values?.tapENG?.id !== undefined && values.tapENG.id !== values.tapVN.id) {
  //     setValue('tapVN.id', values.tapENG.id, { shouldValidate: false, shouldDirty: false });
  //   }
  // }, [values?.tapENG?.id, values?.tapVN?.id, setValue]);

  useEffect(() => {
    if (isEdit && dataPostUpdate) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, dataPostUpdate]);

  const [createdPubForm] = useMutation(CREATED_PUBLICATION, {
    variables: {
      input: {},
    },
  });

  const [updatePubForm] = useMutation(UPDATE_PUBLICATION, {
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
        await createdPubForm({
          variables: {
            input: {
              // check chuẩn kiểu dữ liệu của input
              type_collection: TypeCollection.Publication,
              ...(values?.title !== '' && {
                name: values?.tapVN.name,
                description_type_collection: values?.tapVN.description,
              }),
              ...(values?.titleEnglish !== '' && {
                description_type_collectionElg: values?.tapENG.descriptionElg,
                nameElg: values?.tapENG.nameElg,
              }),

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
        await updatePubForm({
          variables: {
            input: {
              // check chuẩn kiểu dữ liệu của input
              id: Number(values?.id),
              title: values?.title,
              collection_Vietnamese: values?.content,
              description: values?.description,
              imgURL: uploadFile, // Sửa thành avartaURL
              title_english: values?.titleEnglish,
              collection_English: values?.contentEnglish,
              description_english: values?.descriptionEnglish,
            },
          },
        });
      }
      reset();
      enqueueSnackbar(isEdit ? 'Sửa bài thành công!' : 'Đăng bài thành công!');
      navigate(PATH_DASHBOARD.publication.list);
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
              disabled
            >
              <Typography variant="h5">{t('news.tab1')}</Typography>
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
              disabled
            >
              <Typography variant="h5">{t('news.tab2')}</Typography>
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={3} sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              {currentTab === 1 ? (
                <PublicationPostVNStack onNext={handleTabClick} onDrop={handleDrop} isEdit={isEdit} />
              ) : (
                <PublicationPostEnglishStack onBack={handleTabClick} onDrop={handleDrop} isEdit={isEdit} />
              )}
            </Card>
          </Grid>
        </Grid>
      </FormProvider>
    </>
  );
}
