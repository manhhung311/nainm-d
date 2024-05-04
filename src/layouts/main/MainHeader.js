import { useLocation } from 'react-router-dom';
// @mui
import { AppBar, Box, Grid, Toolbar } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
// hooks
import useOffSetTop from '../../hooks/useOffSetTop';
import useResponsive from '../../hooks/useResponsive';
// utils
import cssStyles from '../../utils/cssStyles';
// config
import { HEADER } from '../../config';
// locals
import LanguagePopover from '../dashboard/header/LanguagePopover';
// components
import LoginButton from '../../components/LoginButton';
import Logo from '../../components/Logo';
import navConfig from './MenuConfig';
import MenuDesktop from './MenuDesktop';
import MenuMobile from './MenuMobile';
//

// ----------------------------------------------------------------------

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  height: HEADER.MOBILE_HEIGHT,
  transition: theme.transitions.create(['height', 'background-color'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  [theme.breakpoints.up('md')]: {
    height: HEADER.MAIN_DESKTOP_HEIGHT,
  },
}));

const ToolbarShadowStyle = styled('div')(({ theme }) => ({
  left: 0,
  right: 0,
  bottom: 0,
  height: 24,
  zIndex: -1,
  margin: 'auto',
  borderRadius: '50%',
  position: 'absolute',
  width: `calc(100% - 48px)`,
  boxShadow: theme.customShadows.z8,
}));

// ----------------------------------------------------------------------

export default function MainHeader() {
  const isOffset = useOffSetTop(HEADER.MAIN_DESKTOP_HEIGHT);

  const theme = useTheme();

  const { pathname } = useLocation();

  const isDesktop = useResponsive('up', 'md');

  const isHome = pathname === '/';

  return (
    <AppBar sx={{ boxShadow: 0, bgcolor: 'transparent' }}>
      <ToolbarStyle
        disableGutters
        sx={{
          ...(isOffset && {
            ...cssStyles(theme).bgBlur(),
            height: { md: HEADER.MAIN_DESKTOP_HEIGHT - 16 },
          }),
          padding: theme.spacing(0, 2),
          [theme.breakpoints.up('md')]: {
            padding: theme.spacing(0, 10),
          },
          margin: '0 0',
        }}
      >
        <Grid
          container
          spacing={0}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Grid item xs={5} md={2} sx={{ justifyContent: 'start', alignItems: 'center', display: 'flex' }}>
            <Logo headerHeight={HEADER.MAIN_DESKTOP_HEIGHT} />
          </Grid>
          <Grid item xs={1} md={8} sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
            <Box sx={{ flexGrow: 1 }} />
            {isDesktop && <MenuDesktop isOffset={isOffset} isHome={isHome} navConfig={navConfig} />}
            <Box sx={{ flexGrow: 0.5 }} />
          </Grid>
          <Grid item xs={5} md={2} sx={{ justifyContent: 'end', alignItems: 'center', display: 'flex' }}>
            <Box sx={{ justifyContent: 'end', alignItems: 'center',display: 'flex' }}>
              <LanguagePopover />
              <LoginButton/>
                {!isDesktop && <MenuMobile isOffset={isOffset} isHome={isHome} navConfig={navConfig}/>}
            </Box>
          </Grid>
        </Grid>
      </ToolbarStyle>
      {isOffset && <ToolbarShadowStyle />}
    </AppBar>
  );
}
