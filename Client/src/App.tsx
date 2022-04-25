import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// @ts-ignore
import NotFound from './pages/NotFound.tsx';
// @ts-ignore
import Login from './pages/Login.tsx';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<span>No page here</span>} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
