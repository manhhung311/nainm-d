// @mui
import { styled } from '@mui/material/styles';
// components
import Page from '../components/Page';
import HomeHero from '../sections/home/HomeHero';
import HomeMinimal from '../sections/home/HomeMinimal';
import useLocales from '../locals/useLocals';
// ----------------------------------------------------------------------
const RootStyle = styled('div')(({ theme }) => ({
  // height: '100%',
  paddingTop: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(11),
  },
}));
// ----------------------------------------------------------------------

export default function HomePage() {
  const { t } = useLocales();
  return (
    <Page title={t('home.title')}>
      <RootStyle>
        <HomeHero />
        <HomeMinimal />
      </RootStyle>
    </Page>
  );
}
