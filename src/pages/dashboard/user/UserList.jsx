// @mui
import { styled } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';
// components
import Page from '../../../components/Page';
import useLocales from '../../../locals/useLocals';
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
  const { t } = useLocales();
  return (
    <Page title="Danh sách người dùng">
      {isDashboard ? (
        <h1>{t('demo.title')}</h1>
      ) : (
        <RootStyle>
          <h1>Danh sách người dùng</h1>
        </RootStyle>
      )}
    </Page>
  );
}
