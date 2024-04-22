// @mui
import { styled } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';
// components
import Page from '../../../components/Page';
import Student from '../../../sections/people/student';
import People from '../../People';
// ----------------------------------------------------------------------
const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(8),
  [theme.breakpoints.up('xs')]: {
    padding: theme.spacing(10, 1),
  },
}));
// ----------------------------------------------------------------------

export default function ProfileList() {
  const { pathname } = useLocation();

  const isDashboard = pathname.includes('dashboard');
  return (
    <Page title="People">
      {isDashboard ? (
        <People/>
      ) : (
        <RootStyle>
          <People/>
        </RootStyle>
      )}
    </Page>
  );
}
