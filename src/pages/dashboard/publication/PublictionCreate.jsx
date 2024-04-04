// @mui
import { styled } from '@mui/material/styles';
// components
import Page from '../../../components/Page';
// ----------------------------------------------------------------------
const RootStyle = styled('div')(() => ({
  height: '100%',
}));
// ----------------------------------------------------------------------

export default function PublictionCreate() {
  return (
    <Page title="Tạo công bố dự án nghiên cứ">
      <h1>Tạo mới dự án</h1>
    </Page>
  );
}
