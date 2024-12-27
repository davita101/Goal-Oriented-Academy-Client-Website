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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchForm = SearchForm;
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var label_1 = require("@/components/ui/label");
var sidebar_1 = require("@/components/ui/sidebar");
var button_1 = require("./ui/button");
function SearchForm(_a) {
    var items = _a.items, onSearch = _a.onSearch, props = __rest(_a, ["items", "onSearch"]);
    var _b = (0, react_1.useState)(''), query = _b[0], setQuery = _b[1];
    var handleSearch = function (e) {
        e.preventDefault();
        var searchQuery = query.toLowerCase();
        var filteredResults = items.flatMap(function (category) {
            return Array.isArray(category) ? category.filter(function (item) {
                return (item.title && item.title.toLowerCase().includes(searchQuery)) ||
                    (item.items && item.items.some(function (subItem) { return subItem.title && subItem.title.toLowerCase().includes(searchQuery); }));
            }) : [];
        });
        onSearch(filteredResults);
    };
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("form", __assign({}, props, { onSubmit: handleSearch }),
            react_1.default.createElement(sidebar_1.SidebarGroup, { className: "py-0" },
                react_1.default.createElement(sidebar_1.SidebarGroupContent, { className: "relative" },
                    react_1.default.createElement(label_1.Label, { htmlFor: "search", className: "sr-only" }, "Search"),
                    react_1.default.createElement(sidebar_1.SidebarInput, { id: "search", value: query, onChange: function (e) { return setQuery(e.target.value); }, placeholder: "Search titles...", className: "pl-2 group-data-[collapsible=icon]:hidden" }),
                    react_1.default.createElement(button_1.Button, { type: "submit", className: "absolute right-2 top-2" },
                        react_1.default.createElement(lucide_react_1.Search, { size: 18 })))))));
}
