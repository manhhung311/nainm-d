// @mui
import { styled, alpha } from '@mui/material/styles';
import PropTypes from 'prop-types';
import isString from 'lodash/isString';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Button, Container, Typography, DialogActions } from '@mui/material';
// components
import Image from '../../../components/Image';
import PublicationNewForm from '../../../sections/publication/PublicationNewForm';
import { PATH_DASHBOARD } from '../../../routes/paths';
import Page from '../../../components/Page';
import useSettings from '../../../hooks/useSettings';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';

// ----------------------------------------------------------------------
const RootStyle = styled('div')(() => ({
  height: '100%',
}));
// ----------------------------------------------------------------------

export default function PublictionCreate() {
  const { themeStretch } = useSettings();
  return (
    <Page title="Blog: New Post">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Create a new post"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Publication', href: PATH_DASHBOARD.publication.root },
            { name: 'New Publication' },
          ]}
        />

        <PublicationNewForm />
      </Container>
    </Page>
  );
}
