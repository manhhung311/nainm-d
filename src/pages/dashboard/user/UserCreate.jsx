// @mui
import { styled } from '@mui/material/styles';
// components
import Page from '../../../components/Page';
// ----------------------------------------------------------------------
const RootStyle = styled('div')(() => ({
  height: '100%',
}));
// ----------------------------------------------------------------------

export default function UserCreate() {
  return (
    <Page title="Danh sách người dùng">
      <h1>Tạo mới</h1>
    </Page>
  );
}
