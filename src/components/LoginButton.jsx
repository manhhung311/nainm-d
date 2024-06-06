// @mui
import PropTypes from 'prop-types';
// routes
import { Link as RouterLink } from 'react-router-dom';
import { IconButton, Tooltip } from '@mui/material';
import React from 'react';
import { PATH_AFTER_LOGIN } from '../routes/paths';
import { useLocales } from '../locals';
import Iconify from './Iconify';
// config

// ----------------------------------------------------------------------

LoginButton.propTypes = {};

export default function LoginButton() {
  const { t } = useLocales();
  return (
    <Tooltip title={t('menu.Login')}>
      <IconButton color="primary" component={RouterLink} href={PATH_AFTER_LOGIN} to="/dashboard" variant="outlined">
        <Iconify icon={'gravity-ui:person'} sx={{ width: 20, height: 20 }} />
      </IconButton>
    </Tooltip>
    // <Button
    //   component={RouterLink}
    //   href={PATH_AFTER_LOGIN}
    //   to="/dashboard"
    //   variant="outlined"
    //   sx={{ mr: 0, ...sx, whiteSpace: 'nowrap', maxWidth: 100 }}
    // >
    //   {t('menu.Login')}
    // </Button>
  );
}
