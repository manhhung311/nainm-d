// noinspection JSUnresolvedReference

import PropTypes from 'prop-types';
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import * as Yup from 'yup';
import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loader } from 'graphql.macro';
import { useSnackbar } from 'notistack';
import Grid from '@mui/material/Grid';
import { useMutation } from '@apollo/client';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import { FormProvider } from '../../components/hook-form';
import Iconify from '../../components/Iconify';
import TapForm from './TapForm';
import { PATH_DASHBOARD } from '../../routes/paths';
import useLocales from '../../locals/useLocals';
import useToggle from '../../hooks/useToggle';

// ----------------------------------------------------------------------

const CREATE_TAP = loader('../../graphql/mutations/collections/createCollection.graphql');
const UPDATE_TAP = loader('../../graphql/mutations/collections/editTypeCollection.graphql');
const DELETE_TAP = loader('../../graphql/mutations/collections/deleteCollection.graphql');

TapNewEditDialog.propTypes = {
  isOpen: PropTypes.bool,
  tap: PropTypes.array,
  typeCollection: PropTypes.number,
  onClose: PropTypes.func,
  refetchData: PropTypes.func,
};

export default function TapNewEditDialog({ isOpen, onClose, refetchData, tap, typeCollection }) {
  const { t, currentLang } = useLocales();

  const { enqueueSnackbar } = useSnackbar();

  const { toggle: openDeleteTap, onOpen: onOpenDeleteTap, onClose: onCloseDeleteTap } = useToggle();

  const [isEdit, setIsEdit] = useState(false);

  const [idDelete, setIdDelete] = useState(null);

  const NewSchema = Yup.object().shape({
    nameVn: Yup.string().required(t('tapForm.requiredNameTap')),
    nameEng: Yup.string().required(t('tapForm.requiredNameTap')),
    descriptionVN: Yup.string().required(t('tapForm.requiredDescriptionTap')),
    descriptionENG: Yup.string().required(t('tapForm.requiredDescriptionTap')),
  });

  const defaultValues = useMemo(
    () => ({
      id: null,
      nameVn: '',
      nameEng: '',
      descriptionVN: '',
      descriptionENG: '',
    }),
    []
  );

  const methods = useForm({
    resolver: yupResolver(NewSchema),
    defaultValues,
  });

  const { reset, watch, setValue, handleSubmit } = methods;

  const values = watch();

  const [createNewFn] = useMutation(CREATE_TAP, {
    variables: {
      input: {},
    },
    onCompleted: () => {
      enqueueSnackbar('Xóa thành công', {
        variant: 'success',
      });
    },
    // refetchQueries: () => [
    //   {
    //     query: LIST_ALL_NEWS,
    //     variables: {
    //       input: {},
    //     },
    //   },
    // ],
  });

  const [deleteTap] = useMutation(DELETE_TAP, {
    onCompleted: () => {
      enqueueSnackbar(t('tapForm.deleteSuccess'), {
        variant: 'success',
      });
    },

    onError: (error) => {
      enqueueSnackbar(`${t('tapForm.deleteSuccess')}: ${error.message}`, {
        variant: 'error',
      });
    },
  });

  const [updateFacilityFn] = useMutation(UPDATE_TAP, {
    onCompleted: async (res) => {
      if (res) {
        return res;
      }
      return null;
    },
  });

  useEffect(() => {
    if (values?.id === null) {
      setIsEdit(false);
    } else {
      setIsEdit(true);
    }
  }, [values?.id]);

  const handleDeleteTap = async (id) => {
    await deleteTap({
      variables: {
        input: {
          id_tap: id,
        },
      },
    });
    reset();
    onCloseDeleteTap();
    await refetchData();
  };

  const handleDeleteCollection = async (idCollection) => {
    await deleteTap({
      variables: {
        input: {
          id: Number(idCollection),
        },
      },
    });
  };

  const onSubmit = async () => {
    try {
      if (!isEdit) {
        const response = await createNewFn({
          variables: {
            input: {
              // check chuẩn kiểu dữ liệu của input
              type_collection: typeCollection,
              name: values?.nameVn,
              nameElg: values?.nameEng,
              description_type_collection: values?.descriptionVN,
              description_type_collectionElg: values?.descriptionENG,
            },
          },
        });
        await handleDeleteCollection(response?.data?.create_collection?.id);
      } else {
        await updateFacilityFn({
          variables: {
            input: {
              id: Number(values?.id),
              name: values?.nameVn,
              nameElg: values?.nameEng,
              description_type_collection: values?.descriptionVN,
              description_type_collectionElg: values?.descriptionENG,
            },
          },
        });
      }
      reset();
      refetchData();
      enqueueSnackbar(isEdit ? t('message.Successfully edited!') : t('message.Successful post!'));
      onClose(PATH_DASHBOARD.publication.list);
    } catch (error) {
      enqueueSnackbar(isEdit ? t('message.Failed post fix!') : t('message.Post failed!'), { variant: 'error' });
    }
  };

  const handleSetDataForm = (tap) => {
    setValue('nameVn', tap.name);
    setValue('nameEng', tap.nameElg);
    setValue('descriptionVN', tap.description);
    setValue('descriptionENG', tap.descriptionElg);
    setValue('id', tap.id);
  };

  const handleClose = () => {
    onClose();
    reset();
  };
  const handleReset = () => {
    reset();
  };

  const handleOpenDeleteTap = async (id) => {
    await setIdDelete(id);
    onOpenDeleteTap();
  };

  return (
    <Dialog fullScreen fullWidth maxWidth="md" open={isOpen} onClose={handleClose}>
      <Stack alignItems="flex-end" paddingY={0}>
        <Tooltip title={t('tapForm.close')}>
          <IconButton color="primary" onClick={() => onClose()}>
            <Iconify icon={'material-symbols:close'} />
          </IconButton>
        </Tooltip>
      </Stack>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle variant="h5" sx={{ textAlign: 'center', py: 1 }}>
          {t('tapForm.updateTap')}
        </DialogTitle>
        <DialogContent sx={{ minWidth: '400px', minHeight: '200px' }}>
          <Grid container spacing={5} alignItems="center">
            <Grid item xs={12} md={5} sx={{ justifyContent: 'center', display: 'flex' }}>
              <Button variant="contained" onClick={handleReset}>
                {t('navItem.create')}
              </Button>
            </Grid>
            <Grid item xs={12} md={7}>
              <Typography variant="subtitle1" sx={{ textAlign: 'center', color: 'text.primary' }}>
                {values?.id ? t('navItem.update') : t('navItem.create')}
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={5}>
            <Grid item xs={12} md={5} sx={{ mt: 2 }}>
              {tap &&
                tap.map((item, index) => (
                  <Card key={index} sx={{ mb: 2, bgcolor: item.id === values?.id ? 'background.neutral' : '' }}>
                    <CardActionArea onClick={() => handleSetDataForm(item)}>
                      <CardContent>
                        <Stack direction="row" justifyContent="space-between">
                          <Typography gutterBottom variant="h5" component="div">
                            {currentLang.value === 'vi' ? item?.name : item?.nameElg}
                          </Typography>
                          <Tooltip title={t('card.Erase')}>
                            <IconButton color="error" onClick={() => handleOpenDeleteTap(item.id)}>
                              <Iconify icon={'eva:trash-2-outline'} />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                ))}
            </Grid>

            <TapForm />
          </Grid>
        </DialogContent>

        <Dialog maxWidth="sm" open={openDeleteTap} onClose={onCloseDeleteTap}>
          <DialogTitle id="alert-dialog-title">{t('tapForm.cfDelete')}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">{t('tapForm.notiDelete')}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={onCloseDeleteTap}>{t('card.cancel')}</Button>
            <Button color="error" onClick={() => handleDeleteTap(idDelete)}>
              {t('card.Erase')}
            </Button>
          </DialogActions>
        </Dialog>
      </FormProvider>
    </Dialog>
  );
}
