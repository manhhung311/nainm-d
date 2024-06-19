import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ApolloProvider } from '@apollo/client';
import NotistackProvider from './components/NotistackProvider';
import LocalizationProvider from './locals/localization-provider';
import Router from './routes';
import ThemeProvider from './theme';
import { AuthProvider } from './contexts/JWTContext';
import apolloConnection from './apolloServer';
import './locals/i18n';
import 'simplebar/src/simplebar.css';
import 'react-image-lightbox/style.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import 'react-quill/dist/quill.snow.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import 'react-lazy-load-image-component/src/effects/black-and-white.css';
import { CollapseDrawerProvider } from './contexts/CollapseDrawerContext';

function App() {
  return (
    <ApolloProvider client={apolloConnection}>
      <LocalizationProvider>
        <AuthProvider>
          <HelmetProvider>
            <CollapseDrawerProvider>
              <BrowserRouter>
                <ThemeProvider>
                  <NotistackProvider>
                    <Router />
                  </NotistackProvider>
                </ThemeProvider>
              </BrowserRouter>
            </CollapseDrawerProvider>
          </HelmetProvider>
        </AuthProvider>
      </LocalizationProvider>
    </ApolloProvider>
  );
}

export default App;
