import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ApolloProvider } from '@apollo/client';
import NotistackProvider from './components/NotistackProvider';
import Router from './routes';
import ThemeProvider from './theme';
import { AuthProvider } from './contexts/JWTContext';
import apolloConnection from './apolloServer';

function App() {
  return (
    <ApolloProvider client={apolloConnection}>
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
    </ApolloProvider>
  );
}

export default App;
