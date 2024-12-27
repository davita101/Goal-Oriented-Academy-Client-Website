"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Login;
var react_1 = require("react");
var button_1 = require("@/components/ui/button");
var form_1 = require("@/components/ui/form");
var input_1 = require("@/components/ui/input");
var login_1 = require("@/schema/login");
var react_hook_form_1 = require("react-hook-form");
var zod_1 = require("@hookform/resolvers/zod");
var axios_1 = require("axios");
var lucide_react_1 = require("lucide-react");
function Login() {
    var _this = this;
    var _a = (0, react_1.useState)(""), emailValue = _a[0], setEmailValue = _a[1];
    var _b = (0, react_1.useState)(false), sendInfo = _b[0], setSendInfo = _b[1];
    var _c = (0, react_1.useState)(''), message = _c[0], setMessage = _c[1];
    var form = (0, react_hook_form_1.useForm)({
        resolver: (0, zod_1.zodResolver)(login_1.formSchemaEmail),
        defaultValues: {
            email: "",
        },
    });
    // ! this is important if i want change values and update it instant
    var handleEmailChange = function (e) {
        setEmailValue(e.target.value);
    };
    // ! this is important if i want change values and update it instant
    var emailValidationResult = login_1.formSchemaEmail.safeParse(form.getValues());
    // * client email 
    var clientEmail = login_1.formSchemaEmail.safeParse(form.getValues()).success && emailValidationResult.data.email;
    var handleEmailSubmit = function (e) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            e.preventDefault();
            if (clientEmail) {
                axios_1.default
                    .post("http://localhost:5000/api/auth/login", { email: clientEmail })
                    .catch(function (error) { return console.error("Error fetching users:", error); });
                setSendInfo(true);
            }
            return [2 /*return*/];
        });
    }); };
    return (react_1.default.createElement("div", { className: "max-w-[400px] mx-auto h-screen w-full flex flex-col items-center justify-center" },
        react_1.default.createElement("p", { className: "text-center text-[35px] pb-4 font-bold text-green-500" }, "Goal Oriented Academy"),
        !sendInfo ? (react_1.default.createElement("div", { className: "p-2 w-full mx-2" },
            react_1.default.createElement(form_1.Form, __assign({}, form),
                react_1.default.createElement("form", { method: "get", action: "http://localhost:5000/login", className: "space-y-8" },
                    react_1.default.createElement(form_1.FormField, { control: form.control, name: "email", rules: { required: "Email is required", pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email format" } }, render: function (_a) {
                            var field = _a.field;
                            return (react_1.default.createElement(form_1.FormItem, null,
                                react_1.default.createElement(form_1.FormLabel, null, "Email"),
                                react_1.default.createElement(form_1.FormControl, null,
                                    react_1.default.createElement(input_1.Input, __assign({ className: "p-2 px-4", placeholder: "Enter your email" }, field, { 
                                        // ! this is important if i want change values and update it instant
                                        onChange: function (e) {
                                            field.onChange(e); // Let React Hook Form handle the change //! this is important if i want change values and update it instant
                                            handleEmailChange(e); // Also update our local state //! ! this is important if i want change values and update it instant
                                        } }))),
                                react_1.default.createElement(form_1.FormDescription, null, "Enter your Goal-Oriented Academy email."),
                                react_1.default.createElement(form_1.FormMessage, null)));
                        } }),
                    react_1.default.createElement(button_1.Button, { type: "submit", onClick: handleEmailSubmit, 
                        // ! this is important if i want change values and update it instant ---> emailValidationResult.success
                        className: "w-full py-6 ".concat(emailValidationResult.success ? "bg-green-500 hover:bg-green-300" : "bg-green-300 hover:bg-green-300 cursor-not-allowed") }, "Submit")))))
            :
                react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement(lucide_react_1.MoveLeft, { onClick: function () { return setSendInfo(false); }, className: "mr-auto cursor-pointer w-[30px] h-[30px] mb-2 bg-slate-300 hover:bg-slate-200 rounded-full p-2" }),
                    react_1.default.createElement("div", { className: "w-full bg-green-100 rounded-sm p-2" },
                        react_1.default.createElement("div", { className: "flex items-start space-x-3" },
                            react_1.default.createElement("div", { className: " mt-1 flex items-center justify-center w-4 h-4 p-[1px] bg-green-500 text-white rounded-full" },
                                react_1.default.createElement(lucide_react_1.Check, { className: "text-white" })),
                            react_1.default.createElement("p", { className: "text-sm text-gray-700" },
                                react_1.default.createElement("b", null, clientEmail),
                                " Information has been sent successfully to your email. Please check your email to enter in GOA."))))));
}
