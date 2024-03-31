import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import NotistackProvider from './components/NotistackProvider';
import Router from './routes';
import ThemeProvider from './theme';

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider>
          <NotistackProvider>
            <Router />
          </NotistackProvider>
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
