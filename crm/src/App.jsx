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














// import { Routes, Route, BrowserRouter } from 'react-router-dom';
// //import Home from './pages/Home';
// import LoginPage from './pages/LoginPage';
// import RegisterPage from './pages/RegisterPage';

// import Dashboard from './Admin/Dashboard';
// import Nav from './Admin/Nav';
// import AdminPayroll from './Admin/HR/AdminPayroll';
// import HRManager from './Admin/HR/HRManager';
// import Employee from './Admin/HR/Employee';
// import SiteAdmin from './Admin/Site Management/SiteAdmin';
// import SiteProject from './Admin/Site Management/SiteProject';
// import InventorySite from './Admin/Inventory/InventorySite';
// import InventoryOfficer from './Admin/Inventory/InventoryOfficer';
// import Inventorymanager from './Admin/Inventory/InventoryManager';
// import InventoryAdmin from "./Admin/Inventory/InventoryAdmin";
// import PurchaseOfficer from './Admin/PurchaseManagement/PurchaseOfficer';
// import PurchaseAccountant from './Admin/PurchaseManagement/PurchaseAccountant';
// import PurchaseAdmin from './Admin/PurchaseManagement/PurchaseAdmin';
// import ExpenseSupervisor from './Admin/ExpenseManagement/ExpenseSupervisor';
// import ExpenseManager from './Admin/ExpenseManagement/ExpenseManager';
// import ExpenseAccountant from './Admin/ExpenseManagement/ExpenseAccountant';
// import ExpenseAdmin from './Admin/ExpenseManagement/ExpenseAdmin';
// import SiteSupervisor from './Admin/Site Management/SiteSupervisor';
// import SalesAdmin from './Admin/Sales Management/SalesAdmin';
// import SalesProject from './Admin/Sales Management/SalesProject';
// import SalesAccountant from './Admin/Sales Management/SalesAccountant';
// import Home from './pages/Home';

// //import for comomon
// import Sidebar from '../src/Common/Sidebar';
// import Dashboard from '../src/Common/Dashboardc';
// import Layout from '../src/Common/Layout';
// import PurchaseManagement from '../src/Common/PurchaseManagement';
// import SalesManagement from '../src/Common/SalesManagement';

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* Auth Routes */}
//         <Route path="/" element={<Home />}/>
//         <Route path='/common/sidebar' element={<Sidebar/>}/>
//         <Route path="/login" element={<LoginPage />} />
//         <Route path='/register' element={<RegisterPage/>}/>
//         <Route path='/dashboard' element={<Dashboard/>}/>
     
//         <Route path='/Nav' element={<Nav/>}/>
//         <Route path='/adminPayroll' element={<AdminPayroll/>}/>
//         <Route path='/manager' element={<HRManager/>}/>
//         <Route path='/employee' element={<Employee/>}/>
//         <Route path='/siteadmin' element={<SiteAdmin/>}/>
//         <Route path='/siteproject' element={<SiteProject/>}/>
//         <Route path='/inventorysite' element={<InventorySite/>}/>
//         <Route path='/sitesupervisor' element={<SiteSupervisor/>}/>
//         <Route path='/inventoryofficer' element={<InventoryOfficer/>}/>
//         <Route path='/inventorymanager' element={<Inventorymanager/>}/>
//         <Route path='/inventoryadmin' element={<InventoryAdmin/>}/>
//         <Route path='/purchaseofficer' element={<PurchaseOfficer/>}/>
//         <Route path='/purchaseaccountant' element={<PurchaseAccountant/>}/>
//         <Route path='/purchaseadmin' element={<PurchaseAdmin/>}/>
//         <Route path='/expensesupervisor' element={<ExpenseSupervisor/>}/>
//         <Route path='/expensemanager' element={<ExpenseManager/>}/>
//         <Route path='/expenseaccountant' element={<ExpenseAccountant/>}/>
//         <Route path='/expenseadmin' element={<ExpenseAdmin/>}/>
//         <Route path='/salesadmin' element={<SalesAdmin/>}/>
//         <Route path='/salesproject' element={<SalesProject/>}/>
//         <Route path='/salesaccountant' element={<SalesAccountant/>}/>

       
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;





import { Routes, Route, BrowserRouter } from 'react-router-dom';

// Auth Pages
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// Admin Pages
import Dashboard from './Admin/Dashboard';
import Nav from './Admin/Nav';
import AdminPayroll from './Admin/HR/AdminPayroll';
import HRManager from './Admin/HR/HRManager';
import Employee from './Admin/HR/Employee';
import SiteAdmin from './Admin/Site Management/SiteAdmin';
import SiteProject from './Admin/Site Management/SiteProject';
import SiteSupervisor from './Admin/Site Management/SiteSupervisor';
import InventorySite from './Admin/Inventory/InventorySite';
import InventoryOfficer from './Admin/Inventory/InventoryOfficer';
import Inventorymanager from './Admin/Inventory/InventoryManager';
import InventoryAdmin from './Admin/Inventory/InventoryAdmin';
import PurchaseOfficer from './Admin/PurchaseManagement/PurchaseOfficer';
import PurchaseAccountant from './Admin/PurchaseManagement/PurchaseAccountant';
import PurchaseAdmin from './Admin/PurchaseManagement/PurchaseAdmin';
import ExpenseSupervisor from './Admin/ExpenseManagement/ExpenseSupervisor';
import ExpenseManager from './Admin/ExpenseManagement/ExpenseManager';
import ExpenseAccountant from './Admin/ExpenseManagement/ExpenseAccountant';
import ExpenseAdmin from './Admin/ExpenseManagement/ExpenseAdmin';
import SalesAdmin from './Admin/Sales Management/SalesAdmin';
import SalesProject from './Admin/Sales Management/SalesProject';
import SalesAccountant from './Admin/Sales Management/SalesAccountant';
import CommonLayout from '../src/Common/CommonLayout';
// Common Components
import Sidebar from "../src/Common/Sidebar"
import Dashboardc from '../src/Common/Dashboardc';
import Layout from '../src/Common/Layout';
import PurchaseManagement from '../src/Common/PurchaseManagement';
import SalesManagement from "../src/Common/SalesManagement";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Auth Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Admin Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/nav" element={<Nav />} />
        <Route path="/adminPayroll" element={<AdminPayroll />} />
        <Route path="/manager" element={<HRManager />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/siteadmin" element={<SiteAdmin />} />
        <Route path="/siteproject" element={<SiteProject />} />
        <Route path="/sitesupervisor" element={<SiteSupervisor />} />
        <Route path="/inventorysite" element={<InventorySite />} />
        <Route path="/inventoryofficer" element={<InventoryOfficer />} />
        <Route path="/inventorymanager" element={<Inventorymanager />} />
        <Route path="/inventoryadmin" element={<InventoryAdmin />} />
        <Route path="/purchaseofficer" element={<PurchaseOfficer />} />
        <Route path="/purchaseaccountant" element={<PurchaseAccountant />} />
        <Route path="/purchaseadmin" element={<PurchaseAdmin />} />
        <Route path="/expensesupervisor" element={<ExpenseSupervisor />} />
        <Route path="/expensemanager" element={<ExpenseManager />} />
        <Route path="/expenseaccountant" element={<ExpenseAccountant />} />
        <Route path="/expenseadmin" element={<ExpenseAdmin />} />
        <Route path="/salesadmin" element={<SalesAdmin />} />
        <Route path="/salesproject" element={<SalesProject />} />
        <Route path="/salesaccountant" element={<SalesAccountant />} />

        <Route path="/common" element={<CommonLayout />}>
          <Route path="dashboardc" element={<Dashboardc />} />
          <Route path="layout" element={<Layout />} />
          <Route path="purchase" element={<PurchaseManagement />} />
          <Route path="sales" element={<SalesManagement />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
