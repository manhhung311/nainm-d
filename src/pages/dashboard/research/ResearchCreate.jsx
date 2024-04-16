// @mui
import { styled } from '@mui/material/styles';
// components
import Page from '../../../components/Page';

import ResearchNewPostForm from '../../../sections/@dashboard/research/ResearchNewPostForm';
// ----------------------------------------------------------------------
const RootStyle = styled('div')(() => ({
  height: '100%',
}));
// ----------------------------------------------------------------------

export default function ResearchCreate() {
  return (
    <Page title="Tạo công bố dự án nghiên cứ">
      <RootStyle>
        <ResearchNewPostForm />
      </RootStyle>
    </Page>
  );
}
