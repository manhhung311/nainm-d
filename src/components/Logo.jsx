import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
  headerHeight: PropTypes.number, // Thêm prop headerHeight
};

export default function Logo({ disabledLink = false, sx, headerHeight }) {
  const logo = (
    <Box sx={{width: 125, height: headerHeight, ...sx}}>
      <img src='/logo.png' alt="Logo" />
    </Box>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return (
    <RouterLink to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
      {logo}
    </RouterLink>
  );
}
