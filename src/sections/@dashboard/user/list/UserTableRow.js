import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { Avatar, MenuItem, TableCell, TableRow, Typography } from '@mui/material';
// components
import { useMutation } from '@apollo/client';
import LockResetIcon from '@mui/icons-material/LockReset';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { loader } from 'graphql.macro';
import { useSnackbar } from 'notistack';
import Iconify from '../../../../components/Iconify';
import { TableMoreMenu } from '../../../../components/table';
import { roleChangeNumber, RoleId, TypeUser } from '../../../../constant';
import useAuth from '../../../../hooks/useAuth';
import useLocales from '../../../../locals/useLocals';
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
const RESET_PASSWORD = loader('../../../../graphql/mutations/users/updUserForAdmin.graphql');
UserTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onActiveStatus: PropTypes.func,
  onLockStatus: PropTypes.func,
};

export default function UserTableRow({ row, selected, onEditRow, onActiveStatus, onLockStatus }) {
  const { t } = useLocales();

  const { user } = useAuth();

  const { avartaURL, email, firstName, lastName, phoneNumber, role, status, userName, type_user: typeUser } = row;

  const [openMenu, setOpenMenuActions] = useState(null);

  const [showDialog, setShowDialog] = useState(false);

  const [resetPassword] = useMutation(RESET_PASSWORD);
  const { enqueueSnackbar } = useSnackbar();

  const handleOpenMenu = (event) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };
  const openDialog = () => {
    setShowDialog(true);
  };
  const closeDialog = () => {
    setShowDialog(false);
  };

  const handleResetPassword = async () => {
    try {
      const { data } = await resetPassword({
        variables: {
          input: {
            id: row.id,
            PassWordNewUser: true,
          },
        },
      });
      console.log('data', data);
      closeDialog();
      enqueueSnackbar(t('profile.MK'), {
        variant: 'success',
      });
    } catch (error) {
      enqueueSnackbar(`${t('profile.ER')} ${error.message}.`, {
        variant: 'error',
      });
    }
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
                {Number(user?.id) !== Number(row?.id) &&
                  (typeUser === TypeUser.professor || typeUser === TypeUser.member) && (
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
                    </>
                  )}

                {Number(user?.id) !== Number(row?.id) && (
                  <MenuItem
                    onClick={() => {
                      onEditRow();
                      handleCloseMenu();
                    }}
                  >
                    <Iconify icon={'eva:edit-fill'} />
                    {t('user.Edit')}
                  </MenuItem>
                )}

                {(typeUser === TypeUser.professor || typeUser === TypeUser.member) && (
                  <MenuItem
                    onClick={() => {
                      openDialog();
                    }}
                  >
                    <LockResetIcon />
                    {t('user.ResetPassword')}
                  </MenuItem>
                )}
              </>
            }
          />
        )}
      </TableCell>
      <Dialog
        open={showDialog}
        onClose={closeDialog}
        aria-labelledby="reset-password-dialog-title"
        aria-describedby="reset-password-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="reset-password-dialog-description">{t('profile.ContentF')}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}> {t('profile.Cancel')}</Button>
          <Button onClick={handleResetPassword} autoFocus>
            {t('profile.Agree')}
          </Button>
        </DialogActions>
      </Dialog>
    </TableRow>
  );
}
