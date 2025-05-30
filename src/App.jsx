import { Routes, Route, BrowserRouter } from "react-router-dom";

// Auth Pages
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

// Admin Pages
import Dashboard from "./Admin/DashboardcConstruction";
import Nav from "./Admin/Nav";
import AdminPayroll from "./Admin/HR/AdminPayroll";

import HRManager from "./Admin/HR/HRManager";
import Employee from "./Admin/HR/Employee";
import SiteAdmin from "./Admin/Site Management/SiteAdmin";
import SiteProject from "./Admin/Site Management/SiteProject";
import SiteSupervisor from "./Admin/Site Management/SiteSupervisor";
import InventorySite from "./Admin/Inventory/InventorySite";
import InventoryOfficer from "./Admin/Inventory/InventoryOfficer";
import Inventorymanager from "./Admin/Inventory/InventoryManager";
import InventoryAdmin from "./Admin/Inventory/InventoryAdmin";
import PurchaseOfficer from "./Admin/PurchaseManagement/PurchaseOfficer";
import PurchaseAccountant from "./Admin/PurchaseManagement/PurchaseAccountant";
import PurchaseAdmin from "./Admin/PurchaseManagement/PurchaseAdmin";
import ExpenseSupervisor from "./Admin/ExpenseManagement/ExpenseSupervisor";
import ExpenseManager from "./Admin/ExpenseManagement/ExpenseManager";
import ExpenseAccountant from "./Admin/ExpenseManagement/ExpenseAccountant";
import ExpenseAdmin from "./Admin/ExpenseManagement/ExpenseAdmin";
import SalesAdmin from "./Admin/Sales Management/SalesAdmin";
import SalesProject from "./Admin/Sales Management/SalesProject";
import SalesAccountant from "./Admin/Sales Management/SalesAccountant";
import Restaurant from "./Restaurant/Restaurant";
// import Profile from "./Restaurant/Restaurant Setup/Profile";
import Admin from "./Restaurant/Restaurant Setup/Roles";
import TableSetUp from "./Restaurant/Restaurant Setup/TableSetUp";
import Configure from "./Restaurant/Restaurant Setup/Configure";
import MenuItems from "./Restaurant/Menu Management/Menu";
import Category from "./Restaurant/Menu Management/Category";
import Recipe from "./Restaurant/Menu Management/Recipe";
import Price from "./Restaurant/Menu Management/Price";
import CommonLayout from "../src/Common/CommonLayout";
import CreateRole from "./Admin/HR/Admin/CreateRole";
import ConfigPage from "./Admin/HR/Admin/Salary";
import ReportsPage from "./Admin/HR/Admin/Reports";
import EmployeeProfile from "./Admin/HR/Admin/Employee/EmployeeProfile";
import LeaveApplication from "./Admin/HR/Admin/Employee/LeaveApplication";
import PayslipDownload from "./Admin/HR/Admin/Employee/PayslipDownload";
import RestaurantAttendence from "./Admin/HR/Admin/Employee/RestaurantAttendence";

// import EmployeeForm from './Admin/HR/HRManager/EmployeeForm';
// import AttendanceTracker from './Admin/HR/HRManager/AttendanceTracker';
// Common Components
//import Sidebar from "../src/Common/Sidebar"
import Dashboardc from "../src/Common/Dashboardc";
import Layout from "../src/Common/Layout";
import PurchaseManagement from "../src/Common/PurchaseManagement";
import SalesManagement from "../src/Common/SalesManagement";
import Inventory from "../src/Common/Inventory";
import CRMManagement from "../src/Common/Crmmanagement";
import CRMHRManagement from "../src/Common/CRMHRManagement";
import ProfessionalAttendanceSystem from "./Common/Attendence";
import Payroll from "../src/Common/Payroll";
import AccountsFinance from "../src/Common/Account&Finance";
import SecurityRoles from "./Common/SecurityRoles";
import ReportAnalytics from "../src/Common/ReportAnalytics";

//restaurant components
import RestoDashboard from "../src/Restaurant/RestoDashboard";
import RawMaterialsManagement from "./Restaurant/Stock Management/RawMaterial";
import RawMaterial from "./Restaurant/Stock Management/RawMaterial";
import StoreLocation from "./Restaurant/Stock Management/StoreLocation";
import StockLevel from "./Restaurant/Stock Management/StockLevel";
import ManageStock from "./Restaurant/Stock Management/ManageStock";
import RecipeStockDeduction from "./Restaurant/Stock Management/StockDeduction";
import SuppliersVendors from "./Restaurant/Purchase Management/SuppliersVendors";
import PurchaseOrders from "./Restaurant/Purchase Management/PurchaseOrder";
import GoodsReceiptNotes from "./Restaurant/Purchase Management/GoodsReceiptNotes";
import StockInwardApproval from "./Restaurant/Purchase Management/StockInwardApproval";
import PendingPOsPayment from "./Restaurant/Purchase Management/PaymentStatus";
import Addtocart from "../src/Restaurant/Order&Billing/Addtocart";
import CustomerProfile from "./Restaurant/CustomerManagement/CustomerProfile";
import TableManagement from "./Restaurant/Reservations & Table Management/TableManagement";
import KitchenManagement from "./Restaurant/KitchenManagement.jsx/Kitchen";
import ExpenseManagement from "./Restaurant/ExpenseManagemnet/RestaurantExpense";
import RestaurantAnalytics from "./Restaurant/Report/Restaurant&Analytics";
import Supervisor from "./Restaurant/Supervisor/Supervisor";
import SubAdmin from "./Restaurant/SubAdmin/SubAdmin";

// Import the AlertsAndNotifications component
import AlertsAndNotifications from "./Common/AlertsAndNotifications";
import HRAndPayroll from "./Restaurant/Hr&Managenent/HrPayroll";
import ConstructionDashboard from "./Admin/DashboardcConstruction";
// import RestaurantAnalytics from "./Restaurant/Report/Restaurant&Analytics";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* RESTAURANT */}
        <Route path="/RestaurantCrmDashboard" element={<RestoDashboard />} />

        {/* <Route path="/Profile" element={<Profile />} /> */}
        <Route path="/Admin" element={<Admin />} />
        <Route path="/TableSetup" element={<TableSetUp />} />
        <Route path="/Configure" element={<Configure />} />
        <Route path="/Menu" element={<MenuItems />} />
        <Route path="/Category" element={<Category />} />
        <Route path="/Recipe" element={<Recipe />} />
        <Route path="/Price" element={<Price />} />
        <Route path="/RawMaterial" element={<RawMaterial />} />
        <Route path="/StoreLocation" element={<StoreLocation />} />
        <Route path="/StockLevel" element={<StockLevel />} />
        <Route path="/ManageStock" element={<ManageStock />} />
        <Route path="/StockDeduction" element={<RecipeStockDeduction />} />
        <Route path="/SuppliersVendors" element={<SuppliersVendors />} />
        <Route path="/PurchaseOrders" element={<PurchaseOrders />} />
        <Route path="/GoodsReceiptNotes" element={<GoodsReceiptNotes />} />
        <Route path="/StockInwardApproval" element={<StockInwardApproval />} />
        <Route path="/PendingPOsPayment" element={<PendingPOsPayment />} />
        <Route path="/Addtocart" element={<Addtocart />} />
        <Route path="/Customermanagemnet" element={<CustomerProfile />} />
        <Route path="/Tablemangement" element={<TableManagement />} />
        <Route path="/Kitchebnmanagement" element={<KitchenManagement />} />
        <Route path="/HrPayroll" element={<HRAndPayroll />} />
        <Route path="/Restaurantexpense" element={<ExpenseManagement />} />
        <Route path="/Restaurant&analytics" element={<RestaurantAnalytics />} />
        <Route path="/Supervisor" element={<Supervisor />} />
        <Route path="SubAdmin" element={<SubAdmin/>} />

        <Route path="/register" element={<RegisterPage />} />

        {/* Admin Routes */}
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        <Route path="/nav" element={<Nav />} />
        <Route
          path="/ConstructionDashboard"
          element={<ConstructionDashboard />}
        />

        <Route path="/manager" element={<HRManager />} />
        <Route path="/adminPayroll" element={<AdminPayroll />} />
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

        <Route path="/admin/create" element={<CreateRole />} />
        <Route path="/admin/config" element={<ConfigPage />} />
        <Route path="/admin/report" element={<ReportsPage />} />
        <Route path="/employee/profile" element={<EmployeeProfile />} />
        <Route path="/employee/profile" element={<EmployeeProfile />} />
        <Route path="/employee/leave" element={<LeaveApplication />} />
        <Route path="/employee/payslip" element={<PayslipDownload />} />
        <Route path="/employee/attendance" element={<RestaurantAttendence />} />

        {/* <Route path='/manager/employee' element={<EmployeeForm/>}/>
        <Route path='/manager/attendence' element={<AttendanceTracker/>}/> */}
        {/*         
         common routes */}
        <Route path="/common" element={<CommonLayout />}>
          <Route index element={<Dashboardc />} />
          <Route path="layout" element={<Layout />} />
          <Route path="purchase" element={<PurchaseManagement />} />
          <Route path="sales" element={<SalesManagement />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="customers" element={<CRMManagement />} />
          <Route path="hr" element={<CRMHRManagement />} />
          <Route path="attendance" element={<ProfessionalAttendanceSystem />} />
          <Route path="payroll" element={<Payroll />} />
          <Route path="finance" element={<AccountsFinance />} />
          <Route path="reports" element={<ReportAnalytics />} />
          <Route path="security" element={<SecurityRoles />} />
          <Route path="alerts" element={<AlertsAndNotifications />} />
        </Route>
        <Route path="/security" element={<SecurityRoles />} />
        <Route path="/alerts" element={<AlertsAndNotifications />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
