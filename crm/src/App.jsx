import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import SiteManagement from './Admin/SiteManagement';
import Dashboard from './Admin/Dashboard';
import Nav from './Admin/Nav';
import AdminPayroll from './Admin/HR/AdminPayroll';
import HRManager from './Admin/HR/HRManager';
import Employee from './Admin/HR/Employee';
import SiteAdmin from './Admin/Site Management/SiteAdmin';
import SiteProject from './Admin/Site Management/SiteProject';
import InventorySite from './Admin/Inventory/InventorySite';
//import SiteSupervisor from './Admin/Site Management/SiteSupervisor';
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
        <Route path='/employee' element={<Employee/>}/>
        <Route path='/siteadmin' element={<SiteAdmin/>}/>
        <Route path='/siteproject' element={<SiteProject/>}/>
        <Route path='/inventorysite' element={<InventorySite/>}/>
        {/* <Route path='/sitesupervisor' element={<SiteSupervisor/>}/> */}
        {/*<Route path='/sideNavbar' element={<sideNavbar/>}/> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;