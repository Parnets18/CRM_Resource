// src/Common/CommonLayout.jsx
import React from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const CommonLayout = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flex: 1, padding: '20px' }}>
        <Outlet /> {/* This is where nested routes will render */}
      </div>
    </div>
  );
};

export default CommonLayout;
