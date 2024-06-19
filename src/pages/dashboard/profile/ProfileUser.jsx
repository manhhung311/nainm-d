import { useMutation } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Typography } from '@mui/material';
import { loader } from 'graphql.macro';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { RHFUploadAvatar } from '../../../components/hook-form';
import FormProvider from '../../../components/hook-form/FormProvider';
import RHFTextField from '../../../components/hook-form/RHFTextField';
import useAuth from '../../../hooks/useAuth';
import useLocales from '../../../locals/useLocals';
import { PATH_DASHBOARD } from '../../../routes/paths';

const PROFILE_USER = loader('../../../graphql/mutations/users/updUserForUser.graphql');

// import TodoForm from 'src/pages/dashboard/user/TodoForm';
ProfileUser.propTypes = {
  isEdit: PropTypes.bool,
};

export default function ProfileUser({ isEdit }) {
  const { t } = useLocales();
  const { user } = useAuth();
  console.log('user', user);

  const UpdateUserSchema = Yup.object().shape({
    firstName: Yup.string().required(t('user.FirstNames')),
    lastName: Yup.string().required(t('user.LastNames')),
  });
  const defaultValues = useMemo(
    () => ({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      phoneNumber: user?.phoneNumber || '',
      avatarUrl: user?.avartaURL || null,
    }),
    [user]
  );
  const [createNewuser] = useMutation(PROFILE_USER); // gọi API

  const [uploadFile, setUploadFile] = useState(null);
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();
  const methods = useForm({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });
  const {
    reset,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = methods;
  const onSubmit = async (values) => {
    try {
      if (!isEdit) {
        const response = await createNewuser({
          variables: {
            input: {
              firstName: values?.firstName,
              lastName: values?.lastName,
              avartaURL: uploadFile,
              phoneNumber: values?.phoneNumber,
            },
          },
        });

        if (!response.errors) {
          enqueueSnackbar(t('user.Created'), {
            variant: 'success',
          });
          reset();
          navigate(PATH_DASHBOARD.user.list);
        }
      }
    } catch (error) {
      if (!isEdit) {
        enqueueSnackbar(`Tạo mới không thành công ${error.message}.`, {
          variant: 'error',
        });
      } else {
        enqueueSnackbar(`${t('user.UpdatesFailed')} ${error.message}.`, {
          variant: 'error',
        });
      }
    }
  };
  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          'avatarUrl',
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
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3} sx={{ mt: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Grid item xs={12} md={3}>
          <Card sx={{ py: 10, px: 3, height: '85%' }}>
            <Box sx={{ mb: 5 }}>
              <RHFUploadAvatar
                name="avatarUrl"
                accept="image/*"
                maxSize={3145728}
                onDrop={handleDrop}
                helperText={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 2,
                      mx: 'auto',
                      display: 'block',
                      textAlign: 'center',
                      color: 'text.secondary',
                    }}
                  >
                    Allowed *.jpeg, *.jpg, *.png, *.gif
                  </Typography>
                }
              />
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} md={5}>
          <Card sx={{ py: 10, px: 3, height: '85%' }}>
            <Box
              sx={{
                display: 'grid',
                columnGap: 2,
                rowGap: 3,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >
              <RHFTextField name="firstName" label={t('user.FirstName')} />
              <RHFTextField name="lastName" label={t('user.LastName')} />

              <RHFTextField name="phoneNumber" label={t('user.PhoneNumber')} />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {t('user.SaveChanges')}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
