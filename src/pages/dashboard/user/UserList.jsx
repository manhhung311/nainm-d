import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// @mui
import {
  Box,
  Button,
  Card,
  Container,
  FormControlLabel,
  IconButton,
  Stack,
  Switch,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  Tooltip,
} from '@mui/material';
import { loader } from 'graphql.macro';
import { useMutation, useQuery } from '@apollo/client';
// routes
import { useSnackbar } from 'notistack';
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
import useTable, { emptyRows, getComparator } from '../../../hooks/useTable';
import useAuth from '../../../hooks/useAuth';
// _mock_
// components
import Page from '../../../components/Page';
import Iconify from '../../../components/Iconify';
import Scrollbar from '../../../components/Scrollbar';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { TableEmptyRows, TableHeadCustom, TableNoData, TableSelectedActions } from '../../../components/table';
// sections
import UserTableToolbar from '../../../sections/@dashboard/user/list/UserTableToolbar';
import UserTableRow from '../../../sections/@dashboard/user/list/UserTableRow';
import { useLocales } from '../../../locals';
import { roleChangeNumber, RoleId, TypeUser } from '../../../constant';
// ----------------------------------------------------------------------

const ListUsers = loader('../../../graphql/queries/user/ListUsers.graphql');
const EDIT_STATUS_USER = loader('../../../graphql/mutations/users/updUserForAdmin.graphql');

const ROLE_OPTIONS = ['All', 'Admin', 'Manager', 'User'];

const TABLE_HEAD = [
  { id: 'name', label: 'Name', align: 'left' },
  { id: 'E-mail', label: 'Email', align: 'left' },
  { id: 'role', label: 'Role', align: 'left' },
  { id: 'PhoneNumber', label: 'PhoneNumber', align: 'left' },
  { id: 'status', label: 'Status', align: 'left' },
  { id: '', label: '' },
];

// ----------------------------------------------------------------------

export default function UserList() {
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    // setPage,
    //
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();

  const { user } = useAuth();

  const { enqueueSnackbar } = useSnackbar();

  const { t } = useLocales();

  const { themeStretch } = useSettings();

  const navigate = useNavigate();

  const [tableData, setTableData] = useState([]);

  const [filterName, setFilterName] = useState('');

  const [filterRole, setFilterRole] = useState('All');

  const { data: allUsers, refetch } = useQuery(ListUsers);

  useEffect(() => {
    if (allUsers) {
      setTableData(allUsers?.users);
    }
  }, [allUsers]);

  const [editStatus] = useMutation(EDIT_STATUS_USER, {
    onCompleted: () => {
      enqueueSnackbar(t('message.Successful status update!'), {
        variant: 'success',
      });
    },
    onError: (error) => {
      enqueueSnackbar(`${t('Status update failed!. Cause:')} ${error.message}`, {
        variant: 'error',
      });
    },
  });

  const handleEditStatus = async (id, status) => {
    await editStatus({
      variables: {
        input: {
          id,
          status,
        },
      },
    });
    await refetch();
  };

  const handleFilterName = (filterName) => {
    setFilterName(filterName);
  };

  const handleFilterRole = (event) => {
    setFilterRole(event.target.value);
  };

  const handleDeleteRow = (id) => {
    const deleteRow = tableData.filter((row) => row.id !== id);
    setSelected([]);
    setTableData(deleteRow);
  };

  const handleDeleteRows = (selected) => {
    const deleteRows = tableData.filter((row) => !selected.includes(row.id));
    setSelected([]);
    setTableData(deleteRows);
  };

  const handleEditRow = (id, typeUser) => {
    if (typeUser === TypeUser.oldMember || typeUser === TypeUser.cooperator) {
      navigate(PATH_DASHBOARD.user.otherEdit(id));
    } else {
      navigate(PATH_DASHBOARD.user.edit(id));
    }
  };

  const dataFiltered = applySortFilter({
    tableData,
    comparator: getComparator(order, orderBy),
    filterName,
    filterRole,
  });

  const denseHeight = dense ? 52 : 72;

  const isNotFound = (!dataFiltered.length && !!filterName) || (!dataFiltered.length && !!filterRole);

  return (
    <Page title={t('user.pageList')}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={t('user.pageList')}
          links={[
            { name: t('user.Management'), href: PATH_DASHBOARD.root },
            { name: t('user.User'), href: PATH_DASHBOARD.user.root },
            { name: t('user.List') },
          ]}
          action={
            <Stack>
              {user?.role === RoleId.admin && (
                <Button
                  variant="contained"
                  to={PATH_DASHBOARD.user.new}
                  component={RouterLink}
                  startIcon={<Iconify icon={'eva:plus-fill'} />}
                >
                  {t('user.pageNew')}
                </Button>
              )}
            </Stack>
          }
        />

        <Card>
          <UserTableToolbar
            filterName={filterName}
            filterRole={filterRole}
            onFilterName={handleFilterName}
            onFilterRole={handleFilterRole}
            changeLanguageFunc={t}
            optionsRole={ROLE_OPTIONS}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
              {selected.length > 0 && (
                <TableSelectedActions
                  dense={dense}
                  numSelected={selected.length}
                  rowCount={tableData.length}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      tableData.map((row) => row.id)
                    )
                  }
                  actions={
                    <Tooltip title="Delete">
                      <IconButton color="primary" onClick={() => handleDeleteRows(selected)}>
                        <Iconify icon={'eva:trash-2-outline'} />
                      </IconButton>
                    </Tooltip>
                  }
                />
              )}

              <Table size={dense ? 'small' : 'medium'}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  changeLanguageFunc={t}
                  headLabel={TABLE_HEAD}
                  rowCount={tableData.length}
                  numSelected={selected.length}
                  onSort={onSort}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      tableData.map((row) => row.id)
                    )
                  }
                />

                <TableBody>
                  {dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                    <UserTableRow
                      key={row.id}
                      row={row}
                      selected={selected.includes(row.id)}
                      onSelectRow={() => onSelectRow(row.id)}
                      onDeleteRow={() => handleDeleteRow(row.id)}
                      onEditRow={() => handleEditRow(row.id, row.type_user)}
                      onActiveStatus={() => handleEditStatus(row.id, true)}
                      onLockStatus={() => handleEditStatus(row.id, false)}
                    />
                  ))}

                  <TableEmptyRows height={denseHeight} emptyRows={emptyRows(page, rowsPerPage, tableData.length)} />

                  <TableNoData isNotFound={isNotFound} />
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <Box sx={{ position: 'relative' }}>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={dataFiltered.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={onChangePage}
              onRowsPerPageChange={onChangeRowsPerPage}
            />

            <FormControlLabel
              control={<Switch checked={dense} onChange={onChangeDense} />}
              label={t('user.Dense')}
              sx={{ px: 3, py: 1.5, top: 0, position: { md: 'absolute' } }}
            />
          </Box>
        </Card>
      </Container>
    </Page>
  );
}

function applySortFilter({ tableData, comparator, filterName, filterRole }) {
  const stabilizedThis = tableData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  tableData = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    tableData = tableData.filter((item) => item.fullName.toLowerCase().indexOf(filterName.toLowerCase()) !== -1);
  }

  if (filterRole !== 'All') {
    tableData = tableData.filter((item) => roleChangeNumber(item.role) === filterRole);
  }

  return tableData;
}
