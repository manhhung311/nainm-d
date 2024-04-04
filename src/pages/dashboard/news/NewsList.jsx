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

export default function NewsList() {
  const { pathname } = useLocation();

  const isDashboard = pathname.includes('dashboard');
  return (
    <Page title="Tin Tức">
      {isDashboard ? (
        <h1>Danh sách tin tức</h1>
      ) : (
        <RootStyle>
          <h1>Danh sách tin tức</h1>
        </RootStyle>
      )}
    </Page>
  );
}
