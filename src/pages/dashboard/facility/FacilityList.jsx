// @mui
import { styled } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';
// components
import Page from '../../../components/Page';
import FacilityMain from '../../../sections/facility/FacilityMain';
// ----------------------------------------------------------------------
const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(11),
  },
}));
// ----------------------------------------------------------------------

export default function FacilityList() {
  const { pathname } = useLocation();

  const isDashboard = pathname.includes('dashboard');
  return (
    <Page title="Tài nguyên">
      {isDashboard ? (
        <h1>Danh sách thiết bị</h1>
      ) : (
        <RootStyle>
          <FacilityMain/>
        </RootStyle>
      )}
    </Page>
  );
}
