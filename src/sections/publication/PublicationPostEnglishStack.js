import { useFormContext } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import { Button, Grid, Stack, Typography } from '@mui/material';
// routes
// components
import PropTypes from 'prop-types';
import React from 'react';
import { RHFTextField, RHFEditor, RHFUploadSingleFile } from '../../components/hook-form';
import { StatusCollection, TypeCollection } from '../../constant';
import RHFAutocompleteTapENG from '../../components/hook-form/RHFAutocompleteTapENG';
import { useLocales } from '../../locals';

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

PublicationPostEnglishStack.propTypes = {
  onBack: PropTypes.func,
  onDrop: PropTypes.func,
  isEdit: PropTypes.bool,
};

export default function PublicationPostEnglishStack({ onBack, onDrop, isEdit }) {
  const {
    formState: { isSubmitting },
    watch,
  } = useFormContext();

  const values = watch();

  const { t } = useLocales();

  return (
    <>
      <Stack spacing={3}>
        {!isEdit && (
          <RHFAutocompleteTapENG
            name="tapENG"
            statusCollection={StatusCollection.Draft}
            typeCollection={TypeCollection.Publication}
          />
        )}

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
          <LoadingButton
            fullWidth
            type="submit"
            variant="contained"
            size="medium"
            loading={isSubmitting}
            disabled={values?.tapVN?.id === 0 && values?.tapENG?.id === 0}
          >
            {t('news.post')}
          </LoadingButton>
        </Stack>
      </Grid>
    </>
  );
}
