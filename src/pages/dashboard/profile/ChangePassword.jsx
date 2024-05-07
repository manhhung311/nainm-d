import { useMutation } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack } from '@mui/material';
import { loader } from 'graphql.macro';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import FormProvider from '../../../components/hook-form/FormProvider';
import RHFTextField from '../../../components/hook-form/RHFTextField';
import useAuth from '../../../hooks/useAuth';
import { PATH_DASHBOARD, PATH_AUTH } from '../../../routes/paths';

const CHANGE_PASSWORD = loader('../../../graphql/mutations/users/changePassword.graphql');

// import TodoForm from 'src/pages/dashboard/user/TodoForm';
ChangePassword.propTypes = {
  isEdit: PropTypes.bool,
};

export default function ChangePassword({ isEdit }) {
  const UpdateUserSchema = Yup.object().shape({
    oldPassWord: Yup.string().required('oldPassWord is required'),
    newPassWord: Yup.string().required('newPassWord is required'),
  });
  const defaultValues = useMemo(
    () => ({
      oldPassWord: '',
      newPassWord: '',
    }),
    []
  );
  const [createNewuser] = useMutation(CHANGE_PASSWORD); // kết nối api
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();
  const methods = useForm({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });
  const {
    reset,
    handleSubmit,

    formState: { isSubmitting },
  } = methods;
  const onSubmit = async (values) => {
    try {
      if (!isEdit) {
        const response = await createNewuser({
          variables: {
            input: {
              oldPassWord: values?.oldPassWord,
              newPassWord: values?.newPassWord,
            },
          },
        });

        if (!response.errors) {
          enqueueSnackbar('Cập nhật thông tin thành công ', {
            variant: 'success',
          });
          await logout();
        }
      }
    } catch (error) {
      if (!isEdit) {
        enqueueSnackbar(`Tạo mới không thành công ${error.message}.`, {
          variant: 'error',
        });
      } else {
        enqueueSnackbar(`Sửa thông tin cá nhân không thành công. Nguyên nhân: ${error.message}`, {
          variant: 'error',
        });
      }
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3} sx={{ mt: '10px' }}>
        <Grid item md={1} />

        <Grid item xs={12} md={7}>
          <Card sx={{ py: 10, px: 3, height: '85%' }}>
            {!isEdit ? (
              <Box
                sx={{
                  display: 'grid',
                  columnGap: 2,
                  rowGap: 3,
                  gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                }}
              >
                <RHFTextField name="oldPassWord" label="Mật khẩu cũ" />
                <RHFTextField name="newPassWord" label="Mật khẩu mới" />
              </Box>
            ) : (
              <Box
                sx={{
                  display: 'grid',
                  columnGap: 2,
                  rowGap: 3,
                  gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                }}
              >
                <RHFTextField name="oldPassWord" label="Mật khẩu cũ" />
                <RHFTextField name="newPassWord" label="Mật khẩu mới" />
              </Box>
            )}
            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>

        <Grid item md={1} />
      </Grid>
    </FormProvider>
  );
}
