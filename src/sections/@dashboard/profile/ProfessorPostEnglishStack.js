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
import { RHFEditor } from '../../../components/hook-form';
import { useLocales } from '../../../locals';
import RFHAutocompleteUser from '../../../components/hook-form/RFHAutocompleteUser';

// ----------------------------------------------------------------------

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

// ----------------------------------------------------------------------

ProfessorPostEnglishStack.propTypes = {
  onBack: PropTypes.func,
  isEdit: PropTypes.bool,
};

export default function ProfessorPostEnglishStack({ onBack, isEdit }) {
  const { t, currentLang } = useLocales();
  const { watch } = useFormContext();
  const values = watch();

  const {
    formState: { isSubmitting },
  } = useFormContext();
  return (
    <>
      <Stack spacing={3}>
        {isEdit ? (
          <Typography variant="h4" sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
            {' '}
            {values?.userDetail?.fullName}
          </Typography>
        ) : (
          <RFHAutocompleteUser name="user" language={currentLang.value} />
        )}
        <div>
          <LabelStyle>Content</LabelStyle>
          <RHFEditor name="contentEnglish" />
        </div>
      </Stack>
      <Grid item xs={12}>
        <Stack direction="row" justifyContent="space-around" spacing={1.5} sx={{ mt: 3 }}>
          <Button fullWidth variant="contained" size="medium" onClick={() => onBack(1)}>
            {t('profile.trolai')}
          </Button>
          <LoadingButton fullWidth type="submit" variant="contained" size="medium" loading={isSubmitting}>
            {t('profile.post')}
          </LoadingButton>
        </Stack>
      </Grid>
    </>
  );
}
