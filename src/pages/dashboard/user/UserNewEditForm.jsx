// @mui
import { styled } from '@mui/material/styles';
// components
import Page from '../../../components/Page';
// ----------------------------------------------------------------------
const RootStyle = styled('div')(() => ({
  height: '100%',
}));
// ----------------------------------------------------------------------

export default function UserNewEditForm() {
  return (
    <Page title="Danh sách người dùng">
      <h1>Tạo mới sửa</h1>
    </Page>
  );
}
