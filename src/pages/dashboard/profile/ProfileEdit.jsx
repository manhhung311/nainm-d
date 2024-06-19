import LockOpenIcon from '@mui/icons-material/LockOpen';
import { Box, Grid, Tab, Tabs } from '@mui/material';
import Iconify from '../../../components/Iconify';
import Page from '../../../components/Page';
import useTabs from '../../../hooks/useTabs';
import useLocales from '../../../locals/useLocals';
import ChangePassword from './ChangePassword';
import ProfileUser from './ProfileUser';

export default function ProfileEdit() {
  const { t } = useLocales();
  const { currentTab, onChangeTab } = useTabs(1);

  const PROFILE_TABS = [
    {
      value: t('profile.info'),
      id: 1,
      icon: <Iconify icon={'ic:round-account-box'} width={20} height={20} />,
      component: <ProfileUser />,
    },
    {
      value: t('profile.ChangePassword'),
      id: 2,
      icon: <LockOpenIcon icon={'eva:heart-fill'} width={20} height={20} />,
      component: <ChangePassword />,
    },
  ];

  return (
    <Page title="User: Profile">
      <Grid container spacing={3} sx={{ mt: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Grid item xs={12} md={8}>
          <Tabs
            allowScrollButtonsMobile
            variant="scrollable"
            scrollButtons="auto"
            value={currentTab}
            onChange={onChangeTab}
          >
            {PROFILE_TABS.map((tab) => (
              <Tab disableRipple key={tab.id} value={tab.id} icon={tab.icon} label={tab.value} />
            ))}
          </Tabs>
        </Grid>
      </Grid>
      {PROFILE_TABS.map((tab) => {
        const isMatched = tab.id === currentTab;
        return isMatched && <Box key={tab.id}>{tab.component}</Box>;
      })}
    </Page>
  );
}
