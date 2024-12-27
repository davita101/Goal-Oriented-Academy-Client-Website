"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lucide_react_1 = require("lucide-react");
var react_1 = require("react");
var ToggleDarkMode = function () {
    var _a = (0, react_1.useState)(false), isDarkMode = _a[0], setIsDarkMode = _a[1];
    (0, react_1.useEffect)(function () {
        var storedTheme = localStorage.getItem('theme');
        var isDark = storedTheme === 'dark' || (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
        if (isDark) {
            document.documentElement.classList.add('dark');
        }
        setIsDarkMode(isDark);
    }, []);
    var toggleDarkMode = function () {
        var newTheme = !isDarkMode ? 'dark' : 'light';
        document.documentElement.classList.toggle('dark', !isDarkMode);
        localStorage.setItem('theme', newTheme);
        setIsDarkMode(!isDarkMode);
    };
    return (react_1.default.createElement("button", { onClick: toggleDarkMode }, isDarkMode ? react_1.default.createElement(lucide_react_1.Moon, null) : react_1.default.createElement(lucide_react_1.Sun, null)));
};
exports.default = ToggleDarkMode;
