// @mui
import { styled } from '@mui/material/styles';
// components
import Page from '../../../components/Page';
// ----------------------------------------------------------------------
const RootStyle = styled('div')(() => ({
  height: '100%',
}));
// ----------------------------------------------------------------------

export default function UserUpdate() {
  return (
    <Page title="Cập nhật người dùng">
      <h1>Cập nhật</h1>
    </Page>
  );
}
