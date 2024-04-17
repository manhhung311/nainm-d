import { Box, Card, Grid, Stack } from '@mui/material';
// import TodoForm from 'src/pages/dashboard/user/TodoForm';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import FormProvider from '../../components/hook-form/FormProvider';
import RHFTextField from '../../components/hook-form/RHFTextField';
import { PATH_DASHBOARD } from '../../routes/paths';

NewUser.propTypes = {
    isEdit: PropTypes.bool,
    currentUser: PropTypes.object,
};
export default function NewUser({ isEdit, currentUser }) {

    console.log('currentUser', currentUser);
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const NewUserSchema = Yup.object().shape({
        firstName: Yup.string().required('FirstName is required'),
        lastName: Yup.string().required('LastName is required'),
        email: Yup.string().required('Email is required').email(),
        password: Yup.string().required('Password is required'),
        phoneNumber: Yup.string().required('Phone number is required'),
        role: Yup.string().required('Role Number is required'),
    });

    const defaultValues = useMemo(
        () => ({
            firstName: currentUser?.firstName || '',
            email: currentUser?.email || '',
            password: currentUser?.password || '',
            lastName: currentUser?.lastName || '',
            phoneNumber: currentUser?.phoneNumber || '',
            role: currentUser?.role || '',
        }),
        []
    );

    const methods = useForm({
        resolver: yupResolver(NewUserSchema),
        defaultValues,
    });

    const {
        reset,
        setError,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = methods;

    const onSubmit = (values) => {
        try {
            reset();
            enqueueSnackbar(isEdit ? 'create success!' : 'Update success!');
            navigate(PATH_DASHBOARD.user.list); // khi bấm tạo mới thành công thì nó chuyển đến userlist
            console.log('Form sumit:', values);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (isEdit && currentUser) {
            reset(defaultValues);
        }
        if (!isEdit) {
            reset(defaultValues);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isEdit, currentUser]);

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
                <Grid item xs={1} md={2} />
                <Grid item xs={12} md={8}>
                    <Card sx={{ p: 3 }}>
                        <Box
                            sx={{
                                display: 'grid',
                                columnGap: 2,
                                rowGap: 3,
                                gridTemplateColumns: {
                                    xs: 'repeat(1, 1fr)',
                                    sm: 'repeat(2, 1fr)',
                                },
                            }}
                        >
                            <RHFTextField name="firstName" label="First Name" />
                            <RHFTextField name="lastName" label="Last Name" />

                            <RHFTextField name="email" label="Email Address" />
                            <RHFTextField name="password" label="Password" />

                            <RHFTextField name="phoneNumber" label="Phone Number" />
                            <RHFTextField name="role" label="Role" />
                            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                                    {!isEdit ? 'Create User' : 'Save Changes'}
                                </LoadingButton>
                            </Stack>
                        </Box>
                    </Card>
                </Grid>
                <Grid item xs={1} md={2} />
            </Grid>
        </FormProvider>
    );
}
