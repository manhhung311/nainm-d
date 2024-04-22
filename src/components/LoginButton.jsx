// @mui
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
// routes
import { Link as RouterLink } from 'react-router-dom';
import { PATH_AFTER_LOGIN } from '../routes/paths';
import { useLocales } from '../locals';
// config

// ----------------------------------------------------------------------

LoginButton.propTypes = {
  sx: PropTypes.object,
};

export default function LoginButton({ sx }) {
  const { t } = useLocales();
  return (
    <Button component={RouterLink} href={PATH_AFTER_LOGIN} to="/dashboard" variant="outlined" sx={{ mr: 1, ...sx }}>
      {t('menu.Login')}
    </Button>
  );
}
