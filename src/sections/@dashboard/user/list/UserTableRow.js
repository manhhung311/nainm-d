import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Avatar, Checkbox, TableRow, TableCell, Typography, MenuItem } from '@mui/material';
// components
import Label from '../../../../components/Label';
import Iconify from '../../../../components/Iconify';
import { TableMoreMenu } from '../../../../components/table';
import { roleChangeNumber, RoleId } from '../../../../constant/role';
import useAuth from '../../../../hooks/useAuth';
import useLocales from '../../../../locals/useLocals';
// ----------------------------------------------------------------------

UserTableRow.propTypes = {
  changeLanguageFunc: PropTypes.func,
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
};

export default function UserTableRow({ row, selected, onEditRow, onSelectRow, onDeleteRow , changeLanguageFunc }) {
  const { t } = useLocales();

  const { user } = useAuth();

  const theme = useTheme();

  const { avartaURL, email, firstName, lastName, phoneNumber, role, status, type_user: typeUser, userName } = row;

  const [openMenu, setOpenMenuActions] = useState(null);

  const handleOpenMenu = (event) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  return (
    <TableRow hover selected={selected}>
      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar alt={userName} src={avartaURL} sx={{ mr: 2 }} />
        <Typography variant="subtitle2" noWrap>
          {firstName} {lastName}
        </Typography>
      </TableCell>
      <TableCell align="left">{email}</TableCell>
      <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
        {t(`user.${roleChangeNumber(role)}`)}
      </TableCell>
      <TableCell align="center">{phoneNumber}</TableCell>
      <TableCell align="right">
        {user?.role === RoleId.admin && (
          <TableMoreMenu
            open={openMenu}
            onOpen={handleOpenMenu}
            onClose={handleCloseMenu}
            actions={
              <>
                <MenuItem
                  onClick={() => {
                    onDeleteRow();
                    handleCloseMenu();
                  }}
                  sx={{ color: 'error.main' }}
                >
                  <Iconify icon={'eva:trash-2-outline'} />
                  {t('user.Delete')}
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    onEditRow();
                    handleCloseMenu();
                  }}
                >
                  <Iconify icon={'eva:edit-fill'} />
                  {t('user.Edit')}
                </MenuItem>
              </>
            }
          />
        )}
      </TableCell>
    </TableRow>
  );
}
