// import { Routes, Route, BrowserRouter } from 'react-router-dom';
// import Home from './pages/Home';
// import LoginPage from './pages/LoginPage';
// import RegisterPage from './pages/RegisterPage';
// import SiteManagement from './Admin/SiteManagement';
// import Dashboard from './Admin/Dashboard';
// import Nav from './Admin/Nav';
// import AdminPayroll from './Admin/HR/AdminPayroll';
// import HRManager from './Admin/HR/HRManager';
// import Employee from './Admin/HR/Employee';
// import SiteAdmin from './Admin/Site Management/SiteAdmin';
// import SiteProject from './Admin/Site Management/SiteProject';
// import InventorySite from './Admin/Inventory/InventorySite';
// //import SiteSupervisor from './Admin/Site Management/SiteSupervisor';
// //import sideNavbar from './Admin/SideNavbar';
// //-----------------------------------------------------------------------------------------------------
// //this imports for common crm flow
// import Sidebar from "../src/Common/Sidebar";
// import Dashboardc from './Common/Dashboardc';

// function App() {
//   return (
//     <BrowserRouter>
//     <Sidebar/>
//       <Routes>
//         {/* <Route path="/" element={<Home />} />
//         <Route path="/login" element={<LoginPage />} />
//         <Route path='/register' element={<RegisterPage/>}/>
//         <Route path='/dashboard' element={<Dashboard/>}/>
//         <Route path='/siteManagement' element={<SiteManagement/>}/>
//         <Route path='/Nav' element={<Nav/>}/>
//         <Route path='/adminPayroll' element={<AdminPayroll/>}/>
//         <Route path='/manager' element={<HRManager/>}/>
//         <Route path='/employee' element={<Employee/>}/>
//         <Route path='/siteadmin' element={<SiteAdmin/>}/>
//         <Route path='/siteproject' element={<SiteProject/>}/>
//         <Route path='/inventorysite' element={<InventorySite/>}/> */}
//         {/* <Route path='/sitesupervisor' element={<SiteSupervisor/>}/> */}
//         {/*<Route path='/sideNavbar' element={<sideNavbar/>}/> */}
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;














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
//-----------------------------------------------------------------------------------------------------
//this imports for common crm flow
import Sidebar from "../src/Common/Sidebar";
import Dashboardc from '../src/Common/Dashboardc';
import Layout from '../src/Common/Layout';
import SalesManagement from '../src/Common/SalesManagement';
import PurchaseManagement from '../src/Common/PurchaseManagement';
// import InventoryManagement from './pages/InventoryManagement';
// import CustomerManagement from './pages/CustomerManagement';
// import HRManagement from './pages/HRManagement';
// import AttendanceLeave from './pages/AttendanceLeave';
// import Payroll from './pages/Payroll';
// import Finance from './pages/Finance';
// import Reports from './pages/Reports';
// import Security from './pages/Security';
// import Alerts from './pages/Alerts';
// import Layout from './components/Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* CRM Routes with Sidebar Layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboardc />} />
           <Route path="/sales" element={<SalesManagement />} />
          <Route path="/purchase" element={<PurchaseManagement />} /> 
          {/* <Route path="/inventory" element={<InventoryManagement />} />
          <Route path="/customers" element={<CustomerManagement />} />
          <Route path="/hr" element={<HRManagement />} />
          <Route path="/attendance" element={<AttendanceLeave />} />
          <Route path="/payroll" element={<Payroll />} />
          <Route path="/finance" element={<Finance />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/security" element={<Security />} />
          <Route path="/alerts" element={<Alerts />} />   */}
        </Route>
        
        {/* Admin Routes */}
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/siteManagement" element={<SiteManagement />} />
        <Route path="/Nav" element={<Nav />} />
        <Route path="/adminPayroll" element={<AdminPayroll />} />
        <Route path="/manager" element={<HRManager />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/siteadmin" element={<SiteAdmin />} />
        <Route path="/siteproject" element={<SiteProject />} />
        <Route path="/inventorysite" element={<InventorySite />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
