"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var axios_1 = require("axios");
var react_router_dom_1 = require("react-router-dom");
var VerifyEmail = function () {
    var _a = (0, react_1.useState)(''), message = _a[0], setMessage = _a[1];
    var location = (0, react_router_dom_1.useLocation)();
    var navigate = (0, react_router_dom_1.useNavigate)();
    (0, react_1.useEffect)(function () {
        if (token) {
            axios_1.default.get("".concat(import.meta.env.VITE_API_URL, "/api/auth/verify-email/").concat(token))
                .then(function (response) {
                setMessage('Email verified successfully!');
                // Save the JWT token and redirect to the dashboard
                localStorage.setItem('token', response.data);
                navigate('/dashboard');
            })
                .catch(function (error) {
                setMessage('Invalid or expired token');
            });
        }
    }, [location, navigate]);
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h1", null, message)));
};
exports.default = VerifyEmail;
