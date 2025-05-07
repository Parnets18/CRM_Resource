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
import InventoryOfficer from './Admin/Inventory/InventoryOfficer';
import Inventorymanager from './Admin/Inventory/InventoryManager';
import InventoryAdmin from "./Admin/Inventory/InventoryAdmin";
import PurchaseOfficer from './Admin/PurchaseManagement/PurchaseOfficer';
import PurchaseAccountant from './Admin/PurchaseManagement/PurchaseAccountant';
import PurchaseAdmin from './Admin/PurchaseManagement/PurchaseAdmin';
import ExpenseSupervisor from './Admin/ExpenseManagement/ExpenseSupervisor';
import ExpenseManager from './Admin/ExpenseManagement/ExpenseManager';
import ExpenseAccountant from './Admin/ExpenseManagement/ExpenseAccountant';
import ExpenseAdmin from './Admin/ExpenseManagement/ExpenseAdmin';
import SiteSupervisor from './Admin/Site Management/SiteSupervisor';
import SalesAdmin from './Admin/Sales Management/SalesAdmin';
import SalesProject from './Admin/Sales Management/SalesProject';
import SalesAccountant from './Admin/Sales Management/SalesAccountant';

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
        <Route path='/sitesupervisor' element={<SiteSupervisor/>}/>
        <Route path='/inventoryofficer' element={<InventoryOfficer/>}/>
        <Route path='/inventorymanager' element={<Inventorymanager/>}/>
        <Route path='/inventoryadmin' element={<InventoryAdmin/>}/>
        <Route path='/purchaseofficer' element={<PurchaseOfficer/>}/>
        <Route path='/purchaseaccountant' element={<PurchaseAccountant/>}/>
        <Route path='/purchaseadmin' element={<PurchaseAdmin/>}/>
        <Route path='/expensesupervisor' element={<ExpenseSupervisor/>}/>
        <Route path='/expensemanager' element={<ExpenseManager/>}/>
        <Route path='/expenseaccountant' element={<ExpenseAccountant/>}/>
        <Route path='/expenseadmin' element={<ExpenseAdmin/>}/>
        <Route path='/salesadmin' element={<SalesAdmin/>}/>
        <Route path='/salesproject' element={<SalesProject/>}/>
        <Route path='/salesaccountant' element={<SalesAccountant/>}/>

       
      </Routes>
    </BrowserRouter>
  );
}

export default App;