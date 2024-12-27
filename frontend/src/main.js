"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var client_1 = require("react-dom/client");
require("./index.css");
var App_tsx_1 = require("./App.tsx");
var react_router_dom_1 = require("react-router-dom");
(0, client_1.createRoot)(document.getElementById('root')).render(React.createElement(react_1.StrictMode, null,
    React.createElement(react_router_dom_1.BrowserRouter, null,
        React.createElement(App_tsx_1.default, null))));