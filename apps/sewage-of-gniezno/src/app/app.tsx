import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Upload from './pages/upload';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Upload />} />
        <Route path="/results" element={<div>Results</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
