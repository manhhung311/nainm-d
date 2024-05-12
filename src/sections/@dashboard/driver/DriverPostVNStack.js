// form
// @mui
import { styled } from '@mui/material/styles';
import { Button, Grid, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
// routes
// components
import React from 'react';
import { RHFEditor, RHFTextField } from '../../../components/hook-form';
import { useLocales } from '../../../locals';
//

// ----------------------------------------------------------------------

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

// ----------------------------------------------------------------------

DriverPostVNStack.propTypes = {
  onNext: PropTypes.func,
};

export default function DriverPostVNStack({ onNext }) {
  const { t } = useLocales();

  return (
    <>
      <Stack spacing={3}>
        <RHFTextField name="title" label={t('create.postTitle')} />

        <RHFTextField name="description" label="Link" multiline rows={3} />
      </Stack>
      <Grid item xs={12}>
        <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
          <Button fullWidth variant="contained" size="medium" onClick={() => onNext(2)}>
            {t('news.tiep')}
          </Button>
        </Stack>
      </Grid>
    </>
  );
}
