// noinspection JSUnresolvedReference

import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { loader } from 'graphql.macro';
import { useSnackbar } from 'notistack';
import { useMutation, useQuery } from '@apollo/client';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { LoadingButton } from '@mui/lab';
import DialogActions from '@mui/material/DialogActions';
import { FormProvider } from '../../components/hook-form';
import Iconify from '../../components/Iconify';
import useLocales from '../../locals/useLocals';
import { TypeCollection } from '../../constant';
import useTabs from '../../hooks/useTabs';
import TextMaxLine from '../../components/TextMaxLine';

// ----------------------------------------------------------------------

const TABS = [
  {
    value: 1,
    label: 'publish',
    color: 'success',
  },
  {
    value: 0,
    label: 'waitForApproval',
    color: 'info',
  },
  {
    value: 2,
    label: 'hidden',
    color: 'default',
  },
  {
    value: true,
    label: 'standOut',
    color: 'default',
  },
];

const TABS2 = [
  {
    value: 1,
    label: 'publish',
    color: 'success',
  },
  {
    value: 0,
    label: 'waitForApproval',
    color: 'info',
  },
  {
    value: 2,
    label: 'hidden',
    color: 'default',
  },
];

const LIST_TAP = loader('../../graphql/queries/tap/listTap.graphql');
const EDIT_LIST_TAP = loader('../../graphql/mutations/collections/editTypeCollection.graphql');

TapListDialog.propTypes = {
  isOpen: PropTypes.bool,
  typeCollection: PropTypes.number,
  onClose: PropTypes.func,
  refetchData: PropTypes.func,
  idCurrentTap: PropTypes.number,
};

export default function TapListDialog({ isOpen, onClose, refetchData, idCurrentTap, typeCollection }) {
  const { t, currentLang } = useLocales();

  const { enqueueSnackbar } = useSnackbar();

  const { currentTab: filterStatusDialog, onChangeTab: onFilterStatus } = useTabs(1);

  const [collections, setCollection] = useState(false);

  const [currentTab, setCurrentTab] = useState(null);
  const [arraySort, setArraySort] = useState([]);

  const { data: collection, refetch } = useQuery(LIST_TAP, {
    variables: {
      input: (() => {
        if (filterStatusDialog === true) {
          return {
            status_collection: 1,
            stand_out: filterStatusDialog,
            type_collection: typeCollection,
            page: 1,
            limit: 999,
          };
        }
        return {
          status_collection: filterStatusDialog,
          type_collection: typeCollection,
          page: 1,
          limit: 999,
        };
      })(),
    },
  });

  useEffect(() => {
    if (collection) {
      setCollection(collection?.collections_research_publication);
      setCurrentTab(collection?.collections_research_publication?.[0]);
    }
  }, [collection]);

  const [updateListTapFn] = useMutation(EDIT_LIST_TAP, {
    onCompleted: async (res) => {
      if (res) {
        return res;
      }
      return null;
    },
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

  const dataFiltered = applySortFilter({
    tableData: currentTab?.collection ?? [],
    filterLanguage: currentLang.value,
  });

  const onSubmit = async () => {
    // try {
    // await updateListTapFn({
    //   variables: {
    //     input: {
    //       id: Number(idCurrentTap),
    //       index: dataFiltered?.map((data) => Number(data?.index)).reverse(),
    //     },
    //   },
    // });
    // enqueueSnackbar(t('message.Successfully edited!'), { variant: 'success' });
    // } catch (error) {
    //   enqueueSnackbar(t('message.Failed post fix!'), { variant: 'error' });
    // }
  };

  const handleDragEnd = (result) => {
    // Kiểm tra nếu không có điểm đến hợp lệ
    if (!result.destination) return;

    const { source, destination } = result;

    // Kiểm tra nếu không có thay đổi vị trí
    if (source.index === destination.index) return;

    // Sao chép danh sách hiện tại
    const updatedTab = Array.from(currentTab.collection);

    // Di chuyển mục từ vị trí nguồn đến vị trí đích
    const [movedItem] = updatedTab.splice(source.index, 1);
    updatedTab.splice(destination.index, 0, movedItem);

    // Cập nhật trạng thái với danh sách đã sắp xếp lại
    setCurrentTab({
      ...currentTab,
      collection: updatedTab,
    });
  };

  // useEffect(() => {
  //
  //     setArraySort(dataFiltered
  //       ?.map(data => Number(data?.index)) // Chuyển đổi index thành số
  //       .reverse());
  //
  // }, [dataFiltered]);

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog fullWidth maxWidth="xl" open={isOpen} onClose={handleClose}>
      <Stack alignItems="flex-end" paddingY={0}>
        <Tooltip title="Đóng">
          <IconButton color="primary" onClick={() => onClose()}>
            <Iconify icon={'material-symbols:close'} />
          </IconButton>
        </Tooltip>
      </Stack>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle variant="h5" sx={{ textAlign: 'center', py: 1 }}>
          Quản lí danh sách
        </DialogTitle>
        <DialogContent sx={{ minWidth: '400px', minHeight: '200px' }}>
          <Stack direction="row" justifyContent="space-between" sx={{ mb: { xs: 3, md: 5 } }}>
            <Tabs
              allowScrollButtonsMobile
              variant="scrollable"
              scrollButtons="auto"
              value={filterStatusDialog}
              onChange={onFilterStatus}
            >
              {(typeCollection === TypeCollection.Publication ? TABS : TABS2).map((tab, idx) => (
                <Tab
                  disableRipple
                  key={idx + 1}
                  value={tab.value}
                  label={
                    <Stack spacing={1} direction="row" alignItems="center">
                      <div>{t(`card.${tab.label}`)}</div>
                    </Stack>
                  }
                />
              ))}
            </Tabs>
          </Stack>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              mb: { xs: 3, md: 5 },
            }}
          >
            {collections &&
              collections.length > 0 &&
              collections.map((nameTap, index) => (
                <Button
                  key={index}
                  sx={{
                    flex: {
                      xs: '1 0 100%',
                      sm: '1 0 50%',
                      md: '1 0 25%',
                    },
                    borderRadius: 0,
                  }}
                  size="large"
                  variant="outlined"
                  style={
                    Number(currentTab?.id) === Number(nameTap?.id)
                      ? { backgroundColor: '#4BD578', color: '#fff' }
                      : { backgroundColor: '#fff', color: '#000' }
                  }
                  onClick={() => {
                    setCurrentTab(nameTap);
                  }}
                >
                  <Typography variant="h5" noWrap>
                    {currentLang.value === 'vi' ? nameTap.name : nameTap.nameElg}
                  </Typography>
                </Button>
              ))}
          </Box>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="all-columns" type="PRODUCT" direction="vertical">
              {(provided, snapshot) => (
                <Stack spacing={2} pt={2} ref={provided.innerRef} {...provided.droppableProps}>
                  {dataFiltered.length > 0 &&
                    dataFiltered.map((post, index) => (
                      <Draggable key={Number(post.id)} draggableId={post.id} index={index}>
                        {(provided) => (
                          <Card
                            key={index}
                            sx={{ mb: 2 }}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <Stack sx={{ p: 2 }}>
                              <TextMaxLine variant={'subtitle2'} persistent>
                                {currentLang.value === 'vi' ? post?.title : post?.title_english}
                              </TextMaxLine>
                            </Stack>
                          </Card>
                        )}
                      </Draggable>
                    ))}
                  {snapshot.isDraggingOver && <div style={{ height: '50px' }} />}
                </Stack>
              )}
            </Droppable>
          </DragDropContext>
        </DialogContent>
        <DialogActions>
          <LoadingButton fullWidth type="submit" variant="contained" size="medium" loading={isSubmitting}>
            Apply
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}

function applySortFilter({ tableData, filterLanguage }) {
  if (filterLanguage === 'en') {
    tableData = tableData.filter((item) => item?.title_english !== '');
  }
  if (filterLanguage === 'vi') {
    tableData = tableData.filter((item) => item?.title !== '');
  }
  return tableData;
}
