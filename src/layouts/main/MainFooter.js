// @mui
import { styled } from '@mui/material/styles';
import { Box, Container, Divider, Grid, IconButton, Typography } from '@mui/material';
// components
import { useEffect, useState } from 'react';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Logo from '../../components/Logo';
import useResponsive from '../../hooks/useResponsive';
import useLocales from '../../locals/useLocals';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.palette.background.default,
}));

// ----------------------------------------------------------------------
function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const scrollTop = window.pageYOffset;
    if (scrollTop > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {isVisible && (
        <IconButton
          onClick={scrollToTop}
          style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: '99', backgroundColor: '#00AB55' }}
        >
          <KeyboardArrowUpIcon />
        </IconButton>
      )}
    </>
  );
}
export default function MainFooter() {
  const isMobile = useResponsive('between', 'xs', 'xs', 'sm');

  const { t } = useLocales();

  return (
    <RootStyle>
      <Divider />
      <Container>
        <Box
          sx={{
            py: 3,
            bgcolor: 'background.default',
          }}
        >
          <Container>
            <Grid container justifyContent="center" alignItems="center">
              {isMobile ? (
                <>
                  <Grid xs={12}>
                    <Logo sx={{ mb: 1, mx: 'auto' }} />
                  </Grid>
                  <Grid xs={12}>
                    <Typography
                      variant="button"
                      component="p"
                      style={{ display: 'flex', justifyContent: 'center', whiteSpace: 'nowrap', fontSize: 11 }}
                    >
                      {t('footer.d1')}
                    </Typography>
                    <Typography
                      variant="button"
                      component="p"
                      style={{ display: 'flex', justifyContent: 'center', whiteSpace: 'nowrap', fontSize: 11 }}
                    >
                      {t('footer.d2')}
                    </Typography>
                    <Typography
                      variant="button"
                      component="p"
                      style={{ display: 'flex', justifyContent: 'center', whiteSpace: 'nowrap', fontSize: 11 }}
                    >
                      {t('footer.d3')}
                    </Typography>
                    <Typography
                      variant="button"
                      component="p"
                      style={{ display: 'flex', justifyContent: 'center', whiteSpace: 'nowrap', fontSize: 11 }}
                    >
                      {t('footer.d4')}
                    </Typography>
                    <ScrollToTopButton />
                  </Grid>
                </>
              ) : (
                <>
                  <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Box sx={{ px: 5 }}>
                      <Logo sx={{ mb: 1, mx: 'auto' }} />
                    </Box>
                    <Box>
                      <Typography variant="button" component="p">
                        {t('footer.d1')}
                      </Typography>
                      <Typography variant="button" component="p">
                        {t('footer.d2')}
                      </Typography>
                      <Typography variant="button" component="p">
                        {t('footer.d3')}
                      </Typography>
                      <Typography variant="button" component="p">
                        {t('footer.d4')}
                      </Typography>
                    </Box>
                  </Grid>
                  <ScrollToTopButton />
                </>
              )}
            </Grid>
          </Container>
        </Box>
      </Container>
    </RootStyle>
  );
}
