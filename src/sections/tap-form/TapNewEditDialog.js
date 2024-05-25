// noinspection JSUnresolvedReference

import PropTypes from 'prop-types';
import { Box, Dialog, DialogContent, DialogTitle, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import * as Yup from 'yup';
import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loader } from 'graphql.macro';
import { useSnackbar } from 'notistack';
import { FormProvider } from '../../components/hook-form';
import useAuth from '../../hooks/useAuth';
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

TapNewEditDialog.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  row: PropTypes.object,
  refetchData: PropTypes.func,
  isOpenView: PropTypes.bool,
};

export default function TapNewEditDialog({ isOpen, onClose, row, refetchData, isOpenView }) {
  const { user } = useAuth();

  const { enqueueSnackbar } = useSnackbar();

  const NewOrderSchema = Yup.object().shape({
    status: Yup.string(),
    uploadFile: Yup.array().min(1, 'Ảnh giấy tờ cần được thêm'),
  });

  const defaultValues = useMemo(
    () => ({
      status: row?.order?.status,
      uploadFile: '',
    }),
    [row]
  );

  const methods = useForm({
    resolver: yupResolver(NewOrderSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const onSubmit = async () => {
    // try {
    // } catch (error) {
    //   console.error(error);
    // }
  };

  const handleClose = () => {
    onClose();
    reset();
  };

  return (
    <>
      <Dialog fullScreen fullWidth maxWidth="md" open={isOpen} onClose={handleClose}>
        <Stack alignItems="flex-end" paddingY={0}>
          <Tooltip title="Đóng">
            <IconButton color="primary" onClick={() => onClose()}>
              <Iconify icon={'material-symbols:close'} />
            </IconButton>
          </Tooltip>
        </Stack>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle variant="h5" sx={{ textAlign: 'center', py: 1 }}>
            Chỉnh sửa tap
          </DialogTitle>
          <DialogContent sx={{ minWidth: '400px', minHeight: '200px' }}>
            <Stack direction="row" alignItems="center" spacing={2} sx={{ py: 1, px: 5 }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ textAlign: { xs: 'left', md: 'left' }, marginRight: 2, color: 'text.primary' }}
                >
                  Danh sách tap
                </Typography>
              </Box>
              <Box sx={{ flexShrink: 0 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ textAlign: { xs: 'left', md: 'left' }, marginRight: 2, color: 'text.primary' }}
                >
                  Quản lí
                </Typography>
              </Box>
            </Stack>
          </DialogContent>
        </FormProvider>
      </Dialog>
    </>
  );
}
