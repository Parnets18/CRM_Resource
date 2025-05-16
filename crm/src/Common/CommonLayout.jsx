// // src/Common/CommonLayout.jsx
// import React from 'react';
// import Sidebar from './Sidebar';
// import Dashboard from './Dashboardc';
// import { Outlet } from 'react-router-dom';

// const CommonLayout = () => {
//   return (
//     <div style={{ display: 'flex' }}>
//       <Sidebar />
//       <Dashboard/>
//       <div style={{ flex: 1, padding: '20px' }}>
//         <Outlet /> {/* This is where nested routes will render */}
//       </div>
//     </div>
//   );
// };

// export default CommonLayout;



// src/Common/CommonLayout.jsx
import React from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const CommonLayout = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <main style={{ flex: 1, padding: '20px', backgroundColor: '#f9f9f9' }}>
        <Outlet /> {/* Nested route components will render here */}
      </main>
    </div>
  );
};

export default CommonLayout;
