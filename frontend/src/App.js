"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = App;
var react_1 = require("react");
var Login_1 = require("./page/Login");
var react_router_dom_1 = require("react-router-dom");
var page_1 = require("./page/page");
var sonner_1 = require("./components/ui/sonner");
function App() {
    var _a = (0, react_1.useState)(''), currentUsers = _a[0], setCurrentUsers = _a[1];
    var navigate = (0, react_router_dom_1.useNavigate)();
    // useEffect(() => {
    //   if (currentUsers && currentUsers.length > 0 && currentUsers[0]["login"]) {
    //     setTimeout(() => {
    //       navigate(`/goa/${currentUsers[0]["_id"]}/dashboard`);
    //     }, 1000)
    //   } else {
    //     setTimeout(() => {
    //       navigate('/login')
    //     }, 1000)
    //   }
    // }, [currentUsers, navigate]);
    return (React.createElement("div", null,
        React.createElement("header", { className: "text-green-300 text-3xl font-bold p-2 absolute" }, "GOA"),
        React.createElement(react_router_dom_1.Routes, null,
            React.createElement(react_router_dom_1.Route, { path: "/", element: React.createElement(React.Fragment, null) }),
            React.createElement(react_router_dom_1.Route, { path: "/login", element: React.createElement(Login_1.default, { currentUsers: currentUsers, setCurrentUsers: setCurrentUsers }) }),
            React.createElement(react_router_dom_1.Route, { path: "/*", element: React.createElement(page_1.default, null) })),
        React.createElement(sonner_1.Toaster, null)));
}
