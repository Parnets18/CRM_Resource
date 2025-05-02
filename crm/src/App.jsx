import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;