// @mui
import { styled } from '@mui/material/styles';
// components
import Page from '../../../components/Page';
// ----------------------------------------------------------------------
const RootStyle = styled('div')(() => ({
  height: '100%',
}));
// ----------------------------------------------------------------------

export default function DriverList() {
  return (
    <Page title="Danh sách tài nguyên nội bộ">
      <h1>Danh sách driver nội bộ</h1>
    </Page>
  );
}
