// form
import { useFormContext } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import { Grid, Stack, Typography } from '@mui/material';
// routes
// components
import PropTypes from 'prop-types';
import React from 'react';
import { RHFTextField } from '../../../components/hook-form';
import { useLocales } from '../../../locals';
//

// ----------------------------------------------------------------------

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

// ----------------------------------------------------------------------

DriverPostEnglishStack.propTypes = {
  onBack: PropTypes.func,
};

export default function DriverPostEnglishStack({ onBack }) {
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
