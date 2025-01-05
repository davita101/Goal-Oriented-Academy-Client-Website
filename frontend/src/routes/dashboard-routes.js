import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Dashboard } from '../page/(dashboard)/Dashboard';
export default function DashboardRoutes() {
    return (React.createElement(Routes, null,
        React.createElement(Route, { path: "/", element: React.createElement(Dashboard, null) })));
}
