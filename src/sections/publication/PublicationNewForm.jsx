import { useSnackbar } from 'notistack';
import { useState } from 'react';
import * as Yup from 'yup';
// next
// import { useRouter } from 'next/router';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { LoadingButton } from '@mui/lab';
import { Card, Grid, Stack, Typography,Button,Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { FormProvider, RHFTextField, RHFEditor } from '../../components/hook-form';

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

export default function PublicationNewForm() {
  const [open, setOpen] = useState(false);

  const { enqueueSnackbar } = useSnackbar();


  const NewBlogSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    content: Yup.string().min(1000).required('Content is required'),
  });

  const defaultValues = {
    title: '',
    description: '',
    content: '',
  };

  const methods = useForm({
    resolver: yupResolver(NewBlogSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = methods;

  const values = watch();

  const onSubmit = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar('Post success!');
    } catch (error) {
      console.error(error);
    }
  };

  console.log('values?.title', values?.title);

  const [currentTab, setCurrentTab] = useState(1);

  const handleTabClick = (tabIndex) => {
    setCurrentTab(tabIndex);
  }
  return (
    <Box>
    <Grid container justifyContent="center" alignItems="center" sx={{ mb: 8, mt: 1 }}>
      <Grid item xs={6} md={3} sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
        <Button
          sx={{ width: '100%', height: '100%', borderRadius: 0 }}
          size="large"
          variant="outlined"
          style={
            currentTab === 1
              ? { backgroundColor: '#4BD578', color: '#fff' }
              : { backgroundColor: '#fff', color: '#000' }
          }
          onClick={() => handleTabClick(1)}
          className={currentTab === 1 ? 'active' : ''}
        >
          <Typography variant="h5">Vietnamese</Typography>
        </Button>
      </Grid>
      <Grid item xs={6} md={3} sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
        <Button
          sx={{ width: '100%', height: '100%', borderRadius: 0 }}
          size="large"
          variant="outlined"
          style={
            currentTab === 2
              ? { backgroundColor: '#4BD578', color: '#fff' }
              : { backgroundColor: '#fff', color: '#000' }
          }
          onClick={() => handleTabClick(2)}
          className={currentTab === 2 ? 'active' : ''}
        >
          <Typography variant="h5">English</Typography>
        </Button>
      </Grid>
    </Grid>
    {currentTab === 1 && (
      <Box style={{my:-2}}>
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}  sx={{justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3,my:-5 }}>
            <Stack spacing={3}>
              <RHFTextField name="title" label="Tiêu đề bài viết" />

              <RHFTextField name="description" label="Mô tả" multiline rows={3} />

              <div>
                <LabelStyle>Nội Dung</LabelStyle>
                <RHFEditor name="content" />
              </div>
            </Stack>
            <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
                <LoadingButton fullWidth type="submit" variant="contained" size="large" loading={isSubmitting}>
                  Đăng
                </LoadingButton>
              </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
    </Box>
        )}
        {currentTab === 2 && (     
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}  sx={{justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3,my:-5  }}>
            <Stack spacing={3}>
              <RHFTextField name="title" label="Post Title" />

              <RHFTextField name="description" label="Description" multiline rows={3} />

              <div>
                <LabelStyle>Content</LabelStyle>
                <RHFEditor name="content" />
              </div>
            </Stack>
            <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
                <LoadingButton fullWidth type="submit" variant="contained" size="large" loading={isSubmitting}>
                  Post
                </LoadingButton>
              </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>      
        )}

    </Box>
  )
}
