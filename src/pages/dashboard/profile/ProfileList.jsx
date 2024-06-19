// @mui
import { styled } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';
// components
import Page from '../../../components/Page';
import People from '../../People';
// ----------------------------------------------------------------------
const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(10),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(10, 5),
  },
}));
// ----------------------------------------------------------------------

export default function ProfileList() {
  const { pathname } = useLocation();

  const isDashboard = pathname.includes('dashboard');
  return (
    <Page title="People">
      {isDashboard ? (
        <People />
      ) : (
        <RootStyle>
          <People />
        </RootStyle>
      )}
    </Page>
  );
}
