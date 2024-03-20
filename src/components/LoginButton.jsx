// @mui
import Button from "@mui/material/Button";
import PropTypes from "prop-types";
// routes
import { Link as RouterLink } from "react-router-dom";
import { PATH_AFTER_LOGIN } from "../routes/paths";
// config

// ----------------------------------------------------------------------

LoginButton.propTypes = {
  sx: PropTypes.object,
};

export default function LoginButton({ sx }) {
  return (
    <Button
      component={RouterLink}
      href={PATH_AFTER_LOGIN}
      variant="outlined"
      sx={{ mr: 1, ...sx }}
    >
      Login
    </Button>
  );
}
