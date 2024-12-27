"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var ProtectedRoute = function () {
    // if (!currentUser) {
    //   return <Navigate to="/login" />;
    // }
    return react_1.default.createElement(react_router_dom_1.Outlet, null);
};
exports.default = ProtectedRoute;
