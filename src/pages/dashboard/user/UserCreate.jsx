// @mui
import { styled } from '@mui/material/styles';
// components
import Page from '../../../components/Page';
import NewUser from '../../../sections/user/NewUser';
// ----------------------------------------------------------------------
const RootStyle = styled('div')(() => ({
  height: '100%',
}));
// ----------------------------------------------------------------------

export default function UserCreate() {
  return (
    <Page title="Danh sách người dùng">
      <NewUser />
    </Page>
  );
}
