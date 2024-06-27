// form
import { useFormContext } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import { Button, Grid, Stack, Typography } from '@mui/material';
// components
import PropTypes from 'prop-types';
import React from 'react';
import { RHFEditor, RHFTextField } from '../../../components/hook-form';
import { useLocales } from '../../../locals';
import RHFAutocompleteTapENG from '../../../components/hook-form/RHFAutocompleteTapENG';
import { StatusCollection, TypeCollection } from '../../../constant';

// ----------------------------------------------------------------------

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

// ----------------------------------------------------------------------

ResearchPostEnglishStack.propTypes = {
  onBack: PropTypes.func,
  isEdit: PropTypes.bool,
};

export default function ResearchPostEnglishStack({ onBack, isEdit }) {
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
            typeCollection={TypeCollection.Research}
          />
        )}
        <RHFTextField name="titleEnglish" label="Post Title" />

        <RHFTextField name="descriptionEnglish" label="Description" multiline rows={3} />

        <div>
          <LabelStyle>Content</LabelStyle>
          <RHFEditor name="contentEnglish" />
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
            disabled={values?.tapVN?.id === 0 && values?.tapENG?.id === 0 && !isEdit}
          >
            {t('news.post')}
          </LoadingButton>
        </Stack>
      </Grid>
    </>
  );
}
