import { Box, Card, Grid, Stack, Typography } from '@mui/material';
// import TodoForm from 'src/pages/dashboard/user/TodoForm';
import { useMutation } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';

import { LoadingButton } from '@mui/lab';
import { loader } from 'graphql.macro';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { RHFUploadAvatar } from '../../components/hook-form';
import FormProvider from '../../components/hook-form/FormProvider';
import RHFSelect from '../../components/hook-form/RHFSelect';
import RHFTextField from '../../components/hook-form/RHFTextField';
import useLocales from '../../locals/useLocals';
import { PATH_DASHBOARD } from '../../routes/paths';

const CREATE_USER = loader('../../graphql/mutations/users/createdUsers.graphql');
const UPDATE_USER = loader('../../graphql/mutations/users/updUserForAdmin.graphql');
NewUser.propTypes = {
  isEdit: PropTypes.bool,
  currentUser: PropTypes.object,
  id: PropTypes.number,
  avartaURL: PropTypes.string,
};

export default function NewUser({ isEdit, currentUser }) {
  const [createNewuser] = useMutation(CREATE_USER);
  const [updateUser] = useMutation(UPDATE_USER);
  const [uploadFile, setUploadFile] = useState(null);

  const { t } = useLocales();

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const NewUserSchema = Yup.object().shape({
    firstName: Yup.string().required(t('user.FirstNames')),
    lastName: Yup.string().required(t('user.LastNames')),
    email: Yup.string().required(t('user.Emails')).email(),
    password: Yup.string().required(t('user.Passwords')),
    role: Yup.string().required(t('user.RoleNumber')),
    typeUser: Yup.string().required(t('user.RoleNumber')),
  });

  const UpdateUserSchema = Yup.object().shape({
    firstName: Yup.string().required(t('user.FirstNames')),
    lastName: Yup.string().required('user.LastNames'),
    email: Yup.string().required('user.Emails').email(),
  });

  const defaultValues = useMemo(
    () => ({
      id: currentUser?.id || null,
      firstName: currentUser?.firstName || '',
      email: currentUser?.email || '',
      password: currentUser?.password || '',
      lastName: currentUser?.lastName || '',
      phoneNumber: currentUser?.phoneNumber || '',
      role: currentUser?.role || 0,
      avatarUrl: currentUser?.avartaURL || null,
      typeUser: currentUser?.type_user || 0,
      userName: currentUser?.userName || '',
      status: currentUser?.status,
    }),
    [currentUser]
  );

  const Roles = [
    { value: 0, label: t('user.Admin') },
    { value: 1, label: t('user.Manager') },
    { value: 2, label: t('user.User') },
  ];

  const TypeUser = [
    { value: 0, label: t('user.PROCCEFER') },
    { value: 1, label: t('user.Student') },
  ];
  const methods = useForm({
    resolver: !isEdit ? yupResolver(NewUserSchema) : yupResolver(UpdateUserSchema),
    defaultValues,
  });

  const {
    reset,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (currentUser) {
      reset(defaultValues);
    }
  }, [currentUser, defaultValues, reset]);
  useEffect(() => {
    // Nếu isEdit là false thì reset form về defaultValues
    if (!isEdit) {
      reset(defaultValues);
    }
  }, [isEdit, defaultValues, reset]);

  const onSubmit = async (values) => {
    try {
      if (!isEdit) {
        const response = await createNewuser({
          variables: {
            input: {
              firstName: values?.firstName,
              lastName: values?.lastName,
              email: values?.email,
              password: values?.password,
              role: Number(values?.role),
              type_user: Number(values?.typeUser),
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
      } else {
        const response = await updateUser({
          variables: {
            input: {
              id: Number(values?.id), // Thêm trường id
              firstName: values?.firstName,
              lastName: values?.lastName,
              avartaURL: uploadFile, // Sửa thành avartaURL
              phoneNumber: values?.phoneNumber,
              email: values?.email,
              Role: Number(values?.role),
            },
          },
        });

        if (!response.errors) {
          enqueueSnackbar(t('user.Updates'), {
            variant: 'success',
          });
          reset();
          navigate(PATH_DASHBOARD.user.list);
        }
      }
    } catch (error) {
      if (isEdit) {
        enqueueSnackbar(`${t('user.UpdatesFailed')}: ${t(`error.${error.message}`)}.`, {
          variant: 'error',
        });
      } else {
        enqueueSnackbar(`${t('user.CreateFailed')}: ${t(`error.${error.message}`)}.`, {
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
      <>
        <Grid container spacing={3}>
          <Grid item md={1} />
          <Grid item xs={12} md={3}>
            <Card sx={{ py: 10, px: 3, height: '100%' }}>
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
          <Grid item xs={12} md={7}>
            <Card sx={{ p: 3 }}>
              {!isEdit ? (
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
                  <RHFTextField name="email" label={t('user.EmailAddress')} />
                  <RHFTextField name="password" label={t('user.PassWord')} />
                  <RHFSelect
                    // value={defaultValues.role}
                    label={t('user.Role')}
                    name="role"
                    onChange={(event) => {
                      setValue('role', event.target.value);
                    }}
                    InputLabelProps={{ shrink: true }}
                  >
                    {Roles.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </RHFSelect>
                  <RHFSelect
                    // value={defaultValues.typeUser}
                    label={t('user.PerSonNel')}
                    name="typeUser"
                    onChange={(event) => {
                      setValue('typeUser', event.target.value);
                    }}
                    InputLabelProps={{ shrink: true }}
                  >
                    {TypeUser.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </RHFSelect>
                  <RHFTextField name="phoneNumber" label={t('user.PhoneNumber')} />
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
                  <RHFTextField name="firstName" label={t('user.FirstName')} />
                  <RHFTextField name="lastName" label={t('user.LastName')} />
                  <RHFTextField name="email" label={t('user.EmailAddress')} />
                  <RHFTextField name="phoneNumber" label={t('user.PhoneNumber')} />

                  <RHFSelect
                    // value={defaultValues.role}
                    label={t('user.Role')}
                    name="role"
                    onChange={(event) => {
                      setValue('role', event.target.value);
                    }}
                    InputLabelProps={{ shrink: true }}
                  >
                    {Roles.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </RHFSelect>
                </Box>
              )}
              <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                  {!isEdit ? t('user.CreateUser') : t('user.SaveChanges')}
                </LoadingButton>
              </Stack>
            </Card>
          </Grid>

          <Grid item md={1} />
        </Grid>
      </>
    </FormProvider>
  );
}
