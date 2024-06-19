// form
// @mui
import { styled } from '@mui/material/styles';
import { Button, Grid, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
// routes
// components
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { RHFEditor } from '../../../components/hook-form';
import { useLocales } from '../../../locals';
import RFHAutocompleteUser from '../../../components/hook-form/RFHAutocompleteUser';
//

// ----------------------------------------------------------------------

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

// ----------------------------------------------------------------------

ProfessorPostVNStack.propTypes = {
  onNext: PropTypes.func,
  isEdit: PropTypes.bool,
};

export default function ProfessorPostVNStack({ onNext, isEdit }) {
  const { t, currentLang } = useLocales();
  const { watch } = useFormContext();
  const values = watch();

  return (
    <>
      <Stack spacing={3}>
        {isEdit ? (
          <Typography variant="h4" sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
            {' '}
            {values?.userDetail?.fullName}
          </Typography>
        ) : (
          <RFHAutocompleteUser name="user" language={currentLang.value} tap={1} />
        )}
        <div>
          <LabelStyle>Content</LabelStyle>
          <RHFEditor name="content" />
        </div>
      </Stack>
      <Grid item xs={12}>
        <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
          <Button fullWidth variant="contained" size="medium" onClick={() => onNext(2)}>
            {t('profile.tiep')}
          </Button>
        </Stack>
      </Grid>
    </>
  );
}
