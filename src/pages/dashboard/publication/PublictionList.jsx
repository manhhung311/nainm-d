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

export default function PublictionList() {
  const { pathname } = useLocation();

  const isDashboard = pathname.includes('dashboard');
  return (
    <Page title="Dự án nghiên cứu">
      {isDashboard ? (
        <h1>Dự án nghiên cứu</h1>
      ) : (
        <RootStyle>
          <h1>Dự án nghiên cứu</h1>
        </RootStyle>
      )}
    </Page>
  );
}
