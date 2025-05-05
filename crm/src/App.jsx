import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import SiteManagement from './Admin/SiteManagement';
import Dashboard from './Admin/Dashboard';
import Nav from './Admin/Nav';
import AdminPayroll from './Admin/HR/AdminPayroll';
import HRManager from './Admin/HR/HRManager';
//import sideNavbar from './Admin/SideNavbar';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/siteManagement' element={<SiteManagement/>}/>
        <Route path='/Nav' element={<Nav/>}/>
        <Route path='/adminPayroll' element={<AdminPayroll/>}/>
        <Route path='/manager' element={<HRManager/>}/>
        {/*<Route path='/sideNavbar' element={<sideNavbar/>}/> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;