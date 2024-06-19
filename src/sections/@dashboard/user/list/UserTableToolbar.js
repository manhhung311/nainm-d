import PropTypes from 'prop-types';
import { Stack, InputAdornment, TextField, MenuItem } from '@mui/material';
// components
import Iconify from '../../../../components/Iconify';
// Section
import useLocales from '../../../../locals/useLocals';
// ----------------------------------------------------------------------

UserTableToolbar.propTypes = {
  changeLanguageFunc: PropTypes.func,
  filterName: PropTypes.string,
  filterRole: PropTypes.string,
  filterTypeUser: PropTypes.string,
  onFilterName: PropTypes.func,
  onFilterRole: PropTypes.func,
  onFilterTypeUser: PropTypes.func,
  optionsRole: PropTypes.arrayOf(PropTypes.string),
  optionsTypeUser: PropTypes.arrayOf(PropTypes.string),
};

export default function UserTableToolbar({
  filterName,
  filterRole,
  filterTypeUser,
  onFilterName,
  onFilterRole,
  onFilterTypeUser,
  optionsRole,
  optionsTypeUser,
  changeLanguageFunc,
}) {
  const { t } = useLocales();
  return (
    <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ py: 2.5, px: 3 }}>
      <TextField
        fullWidth
        select
        label="Role"
        value={filterRole}
        onChange={onFilterRole}
        SelectProps={{
          MenuProps: {
            sx: { '& .MuiPaper-root': { maxHeight: 260 } },
          },
        }}
        sx={{
          maxWidth: { sm: 240 },
          textTransform: 'capitalize',
        }}
      >
        {optionsRole.map((option) => (
          <MenuItem
            key={option}
            value={option}
            sx={{
              mx: 1,
              my: 0.5,
              borderRadius: 0.75,
              typography: 'body2',
              textTransform: 'capitalize',
            }}
          >
            {changeLanguageFunc(`user.${option}`)}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        fullWidth
        select
        label="TypeUser"
        value={filterTypeUser}
        onChange={onFilterTypeUser}
        SelectProps={{
          MenuProps: {
            sx: { '& .MuiPaper-root': { maxHeight: 260 } },
          },
        }}
        sx={{
          maxWidth: { sm: 240 },
          textTransform: 'capitalize',
        }}
      >
        {optionsTypeUser.map((option) => (
          <MenuItem
            key={option}
            value={option}
            sx={{
              mx: 1,
              my: 0.5,
              borderRadius: 0.75,
              typography: 'body2',
              textTransform: 'capitalize',
            }}
          >
            {changeLanguageFunc(`user.${option}`)}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        fullWidth
        value={filterName}
        onChange={(event) => onFilterName(event.target.value)}
        placeholder={t('user.Search')}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify icon={'eva:search-fill'} sx={{ color: 'text.disabled', width: 20, height: 20 }} />
            </InputAdornment>
          ),
        }}
      />
    </Stack>
  );
}
