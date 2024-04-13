// @mui
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';
import Publiction from '../../../sections/publication/Publication';

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
        <>
          <h1>Dự án nghiên cứu</h1>
          <Publiction />
        </>
      ) : (
        <RootStyle>
          <h1>Dự án nghiên cứu</h1>
          <Publiction 
          />
          
        </RootStyle>
      )}
    </Page>
  );
}
