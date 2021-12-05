import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Upload from './pages/upload';
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from 'react-query';
import { StylesProvider } from '@mui/styles';
import { ThemeProvider } from 'styled-components';
import ResultsPage from './pages/results';
import TrucksPage from './pages/trucks';

const App = () => {
  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={{}}>
        <QueryClientProvider client={new QueryClient()}>
          <BrowserRouter>
            <Routes>
              <Route path="/upload" element={<Upload />} />
              <Route path="/results" element={<ResultsPage />} />
              <Route path="/trucks" element={<TrucksPage />} />
            </Routes>
          </BrowserRouter>
          <ToastContainer style={{ fontSize: '16px' }} />
        </QueryClientProvider>
      </ThemeProvider>
    </StylesProvider>
  );
};

export default App;
