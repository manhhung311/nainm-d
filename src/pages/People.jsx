// @mui
import { styled } from '@mui/material/styles';
// components
import Page from '../components/Page';
// ----------------------------------------------------------------------
const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(11),
  },
}));
// ----------------------------------------------------------------------

export default function People() {
  return (
    <Page title="Nhân sự">
      <RootStyle>
        <h1>PEOPLE</h1>
      </RootStyle>
    </Page>
  );
}
