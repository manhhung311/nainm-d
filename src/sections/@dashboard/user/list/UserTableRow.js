import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { Avatar, TableRow, TableCell, Typography, MenuItem } from '@mui/material';
// components
import Iconify from '../../../../components/Iconify';
import { TableMoreMenu } from '../../../../components/table';
import { roleChangeNumber, RoleId } from '../../../../constant';
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
  onActiveStatus: PropTypes.func,
  onLockStatus: PropTypes.func,
};

export default function UserTableRow({ row, selected, onEditRow, onActiveStatus, onLockStatus }) {
  const { t } = useLocales();

  const { user } = useAuth();

  const { avartaURL, email, firstName, lastName, phoneNumber, role, status, userName } = row;

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
      <TableCell align="left">{phoneNumber}</TableCell>
      <TableCell align="left">{status ? t('user.StatusActive') : t('user.StatusLock')}</TableCell>
      <TableCell align="right">
        {user?.role === RoleId.admin && (
          <TableMoreMenu
            open={openMenu}
            onOpen={handleOpenMenu}
            onClose={handleCloseMenu}
            actions={
              <>
                {status === true ? (
                  <MenuItem
                    onClick={() => {
                      onLockStatus();
                      handleCloseMenu();
                    }}
                    sx={{ color: 'error.main' }}
                  >
                    <Iconify icon={'mdi:user-lock-outline'} />
                    {t('user.LockAccount')}
                  </MenuItem>
                ) : (
                  <MenuItem
                    onClick={() => {
                      onActiveStatus();
                      handleCloseMenu();
                    }}
                    sx={{ color: 'success.main' }}
                  >
                    <Iconify icon={'mdi:user-lock-open-outline'} />
                    {t('user.ActiveAccount')}
                  </MenuItem>
                )}

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
