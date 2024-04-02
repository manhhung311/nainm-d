import Button from "@mui/material/Button";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom"; // Sử dụng RouterLink từ react-router-dom
import { PATH_PAGE } from "../routes/paths";

LoginButton.propTypes = {
  sx: PropTypes.object,
};

export default function LoginButton({ sx }) {
  const handleClick = () => {};
  return (
    <Button
      // onClick={handleClick}
      component={RouterLink}
      to={PATH_PAGE.auth}
      variant="outlined"
      sx={{ mr: 1, ...sx }}
    >
      Login
    </Button>
  );
}
