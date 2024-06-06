import { Button, Grid, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';

// routes
// components
import React from 'react';
import { RHFEditor, RHFTextField, RHFUploadSingleFile } from '../../components/hook-form';
import { StatusCollection, TypeCollection } from '../../constant';
import RHFAutocompleteTapVN from '../../components/hook-form/RHFAutocompleteTapVN';
import useLocales from '../../locals/useLocals';

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

PublicationPostVNStack.propTypes = {
  onNext: PropTypes.func,
  onDrop: PropTypes.func,
  isEdit: PropTypes.bool,
};

export default function PublicationPostVNStack({ onNext, onDrop, isEdit }) {
  const { t } = useLocales();

  return (
    <>
      <Stack spacing={3}>
        {!isEdit && (
          <RHFAutocompleteTapVN
            name="tapVN"
            statusCollection={StatusCollection.Draft}
            typeCollection={TypeCollection.Publication}
          />
        )}

        <RHFTextField name="title" label="Post Title" />

        <RHFTextField name="description" label="Description" multiline rows={3} />

        <div>
          <LabelStyle>Content</LabelStyle>
          <RHFEditor name="content" />
        </div>
        <div>
          <LabelStyle>{t('profile.anh')}</LabelStyle>
          <RHFUploadSingleFile name="cover" accept="image/*" maxSize={3145728} onDrop={onDrop} />
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
