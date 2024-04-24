import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import { Card, Grid, Stack, Typography } from '@mui/material';
// routes
// components
import { FormProvider, RHFEditor, RHFTextField } from '../../../components/hook-form';
//

// ----------------------------------------------------------------------

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

// ----------------------------------------------------------------------

export default function NewsNewPostForm() {
  // const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const NewBlogSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    content: Yup.string().min(1000).required('Content is required'),
    cover: Yup.mixed().required('Cover is required'),
  });

  const defaultValues = {
    title: '',
    description: '',
    content: '',
    cover: null,
    tags: ['Logan'],
    publish: true,
    comments: true,
    metaTitle: '',
    metaDescription: '',
    metaKeywords: ['Logan'],
  };

  const methods = useForm({
    resolver: yupResolver(NewBlogSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar('Post success!');
      // navigate(PATH_DASHBOARD.blog.posts);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3} sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <RHFTextField name="title" label="Post Title" />

                <RHFTextField name="description" label="Description" multiline rows={3} />

                <div>
                  <LabelStyle>Content</LabelStyle>
                  <RHFEditor name="content" />
                </div>
              </Stack>
              <Grid item xs={12}>
                <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
                  <LoadingButton fullWidth type="submit" variant="contained" size="large" loading={isSubmitting}>
                    Post
                  </LoadingButton>
                </Stack>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </FormProvider>
    </>
  );
}
