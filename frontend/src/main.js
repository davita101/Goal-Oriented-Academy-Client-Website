import * as React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import AppRoutes from './App';
import { BrowserRouter } from 'react-router-dom';
createRoot(document.getElementById('root')).render(React.createElement(StrictMode, null,
    React.createElement(BrowserRouter, null,
        React.createElement(AppRoutes, null))));
