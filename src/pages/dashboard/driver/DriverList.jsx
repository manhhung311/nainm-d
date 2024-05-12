// @mui
import { styled } from '@mui/material/styles';
// components
import Page from '../../../components/Page';
import DriverMain from '../../../sections/drive/DriverMain';
import useLocales from '../../../locals/useLocals';
// ----------------------------------------------------------------------
const RootStyle = styled('div')(() => ({
  height: '100%',
}));
// ----------------------------------------------------------------------
export default function DriverList() {
  const { t } = useLocales();
  return (
    <Page title={t('driver.page1')}>
      <RootStyle>
        <DriverMain />
      </RootStyle>
    </Page>
  );
}
