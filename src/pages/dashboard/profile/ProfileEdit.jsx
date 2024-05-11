import LockOpenIcon from '@mui/icons-material/LockOpen';
import { Box, Tab, Tabs } from '@mui/material';
import Iconify from '../../../components/Iconify';
import Page from '../../../components/Page';
import useSettings from '../../../hooks/useSettings';
import useTabs from '../../../hooks/useTabs';
import useLocales from '../../../locals/useLocals';
import ChangePassword from './ChangePassword';
import ProfileUser from './ProfileUser';

export default function ProfileEdit() {
  const { t } = useLocales();
  const { currentTab, onChangeTab } = useTabs('profile');
  const { themeStretch } = useSettings();

  const PROFILE_TABS = [
    {
      value: t('profile.info'),
      icon: <Iconify icon={'ic:round-account-box'} width={20} height={20} />,
      component: <ProfileUser />,
    },
    {
      value: t('profile.ChangePassword'),
      icon: <LockOpenIcon icon={'eva:heart-fill'} width={20} height={20} />,
      component: <ChangePassword />,
    },
  ];

  return (
    <Page title="User: Profile">
      <Tabs
        allowScrollButtonsMobile
        variant="scrollable"
        scrollButtons="auto"
        value={currentTab}
        onChange={onChangeTab}
      >
        {PROFILE_TABS.map((tab) => (
          <Tab disableRipple key={tab.value} value={tab.value} icon={tab.icon} label={tab.value} />
        ))}
      </Tabs>

      {PROFILE_TABS.map((tab) => {
        const isMatched = tab.value === currentTab;
        return isMatched && <Box key={tab.value}>{tab.component}</Box>;
      })}
    </Page>
  );
}
