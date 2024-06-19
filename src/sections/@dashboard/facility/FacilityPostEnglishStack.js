// form
import { useFormContext } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import { Button, Grid, Stack, Typography } from '@mui/material';
// routes
// components
import PropTypes from 'prop-types';
import React from 'react';
import { RHFEditor, RHFTextField, RHFUploadSingleFile } from '../../../components/hook-form';
import { useLocales } from '../../../locals';
//

// ----------------------------------------------------------------------

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

// ----------------------------------------------------------------------

FacilityPostEnglishStack.propTypes = {
  onBack: PropTypes.func,
  onDrop: PropTypes.func,
};

export default function FacilityPostEnglishStack({ onBack, onDrop }) {
  const {
    formState: { isSubmitting },
  } = useFormContext();

  const { t } = useLocales();

  return (
    <>
      <Stack spacing={3}>
        <RHFTextField name="titleEnglish" label="Post Title" />

        <RHFTextField name="descriptionEnglish" label="Description" multiline rows={3} />

        <div>
          <LabelStyle>Content</LabelStyle>
          <RHFEditor name="contentEnglish" />
        </div>
        <div>
          <LabelStyle>Image</LabelStyle>
          <RHFUploadSingleFile name="cover" accept="image/*" maxSize={3145728} onDrop={onDrop} />
        </div>
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
