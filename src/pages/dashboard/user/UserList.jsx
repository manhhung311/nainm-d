// @mui
import { styled } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';
// components
import Page from '../../../components/Page';
// ----------------------------------------------------------------------
const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(11),
  },
}));
// ----------------------------------------------------------------------

export default function UserList() {
  const { pathname } = useLocation();

  const isDashboard = pathname.includes('dashboard');
  return (
    <Page title="Danh sách người dùng">
      {isDashboard ? (
        <h1>Quản lý người dùng</h1>
      ) : (
        <RootStyle>
          <h1>Danh sách người dùng</h1>
        </RootStyle>
      )}
    </Page>
  );
}
