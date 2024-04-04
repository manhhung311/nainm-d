// @mui
import { styled } from '@mui/material/styles';
// components
import Page from '../../../components/Page';
// ----------------------------------------------------------------------
const RootStyle = styled('div')(() => ({
  height: '100%',
}));
// ----------------------------------------------------------------------

export default function DriverCreate() {
  return (
    <Page title="Tạo mới driver">
      <h1>Tạo mới driver</h1>
    </Page>
  );
}
