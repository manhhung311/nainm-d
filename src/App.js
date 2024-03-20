import NotistackProvider from "./components/NotistackProvider";
import Router from "./routes";
import ThemeProvider from "./theme";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

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
