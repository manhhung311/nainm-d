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

function App() {
  return (
    <ApolloProvider client={apolloConnection}>
      <LocalizationProvider>
        <AuthProvider>
          <HelmetProvider>
            <BrowserRouter>
              <ThemeProvider>
                <NotistackProvider>
                  <Router />
                </NotistackProvider>
              </ThemeProvider>
            </BrowserRouter>
          </HelmetProvider>
        </AuthProvider>
      </LocalizationProvider>
    </ApolloProvider>
  );
}

export default App;
