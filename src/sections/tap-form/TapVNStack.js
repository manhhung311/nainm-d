// form
// @mui
import { styled } from '@mui/material/styles';
import { Button, Grid, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
// routes
// components
import React from 'react';
import { RHFTextField } from '../../components/hook-form';
import { useLocales } from '../../locals';
//

// ----------------------------------------------------------------------

TapVNStack.propTypes = {
  onNext: PropTypes.func,
};

export default function TapVNStack({ onNext }) {
  const { t } = useLocales();

  return (
    <>
      <Stack spacing={3}>
        <RHFTextField name="nameVn" label="Name " />

        <RHFTextField name="descriptionVN" label="Description" multiline rows={3} />
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
