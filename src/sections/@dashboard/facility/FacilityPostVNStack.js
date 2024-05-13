// form
// @mui
import { styled } from '@mui/material/styles';
import { Button, Grid, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
// routes
// components
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

FacilityPostVNStack.propTypes = {
  onNext: PropTypes.func,
  onDrop: PropTypes.func,
};

export default function FacilityPostVNStack({ onNext, onDrop }) {
  const { t } = useLocales();

  return (
    <>
      <Stack spacing={3}>
        <RHFTextField name="title" label="Post Title" />

        <RHFTextField name="description" label="Description" multiline rows={3} />

        <div>
          <LabelStyle>Content</LabelStyle>
          <RHFEditor name="content" />
        </div>
        <div>
          <LabelStyle>Ảnh</LabelStyle>
          <RHFUploadSingleFile name="cover" accept="image/*" maxSize={3145728} onDrop={onDrop} />
        </div>
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
