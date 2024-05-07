import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { Avatar, MenuItem, TableCell, TableRow, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
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
import { roleChangeNumber, RoleId } from '../../../../constant/role';
import useAuth from '../../../../hooks/useAuth';
import useLocales from '../../../../locals/useLocals';
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
const RESET_PASSWORD = loader('../../../../graphql/mutations/users/updUserForAdmin.graphql');
UserTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
};

export default function UserTableRow({ row, selected, onEditRow, onSelectRow, onDeleteRow }) {
  const { t } = useLocales();

  const { user } = useAuth();

  const theme = useTheme();

  const { avartaURL, email, firstName, lastName, phoneNumber, role, status, type_user: typeUser, userName } = row;

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
      enqueueSnackbar('Mật khẩu đã được reset thành công về: "TeamLabServer" ', {
        variant: 'success',
      });
    } catch (error) {
      enqueueSnackbar(`Đã xảy ra lỗi khi cố gắng reset mật khẩu:. Nguyên nhân: ${error.message}`, {
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
        {roleChangeNumber(role)}
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
                <MenuItem
                  onClick={() => {
                    openDialog();
                  }}
                >
                  <LockResetIcon />
                  {t('user.ResetPassword')}
                </MenuItem>
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
          <DialogContentText id="reset-password-dialog-description">
            Bạn có chắc chắn muốn reset mật khẩu cho người dùng này không?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Hủy</Button>
          <Button onClick={handleResetPassword} autoFocus>
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
    </TableRow>
  );
}
