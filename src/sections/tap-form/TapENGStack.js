// form
// @mui
import { Button, Grid, Stack } from '@mui/material';
import PropTypes from 'prop-types';
// routes
// components
import React from 'react';
import { LoadingButton } from '@mui/lab';
import { useFormContext } from 'react-hook-form';
import { RHFTextField } from '../../components/hook-form';
import { useLocales } from '../../locals';
//

// ----------------------------------------------------------------------

TapENGStack.propTypes = {
  onBack: PropTypes.func,
};

export default function TapENGStack({ onBack }) {
  const { t } = useLocales();
  const {
    formState: { isSubmitting },
  } = useFormContext();

  return (
    <>
      <Stack spacing={3}>
        <RHFTextField name="nameEng" label="Name" />

        <RHFTextField name="descriptionENG" label="Description" multiline rows={3} />
      </Stack>
      <Grid item xs={12}>
        <Stack direction="row" justifyContent="space-around" spacing={1.5} sx={{ mt: 3 }}>
          <Button fullWidth variant="contained" size="medium" onClick={() => onBack(1)}>
            {t('news.trolai')}
          </Button>
          <LoadingButton fullWidth type="submit" variant="contained" size="medium" loading={isSubmitting}>
            {t('news.post')}
          </LoadingButton>
        </Stack>
      </Grid>
    </>
  );
}
