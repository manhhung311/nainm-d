// form
import { useFormContext } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { Grid, Stack } from '@mui/material';
// routes
// components
import React from 'react';
import { RHFTextField } from '../../../components/hook-form';
import { useLocales } from '../../../locals';
//

// ----------------------------------------------------------------------

DriverPostEnglishStack.propTypes = {};

export default function DriverPostEnglishStack() {
  const {
    formState: { isSubmitting },
  } = useFormContext();

  const { t } = useLocales();

  return (
    <>
      <Stack spacing={3}>
        <RHFTextField name="title" label="Post Title" />

        <RHFTextField name="description" label="Link" multiline rows={3} />
      </Stack>
      <Grid item xs={12}>
        <Stack direction="row" justifyContent="space-around" spacing={1.5} sx={{ mt: 3 }}>
          <LoadingButton fullWidth type="submit" variant="contained" size="medium" loading={isSubmitting}>
            {t('news.post')}
          </LoadingButton>
        </Stack>
      </Grid>
    </>
  );
}
