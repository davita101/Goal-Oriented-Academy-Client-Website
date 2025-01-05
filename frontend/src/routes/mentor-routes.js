import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { MentorGroup } from '../page/(mentor)/Mentor';
import Groups from '../page/(mentor)/Groups';
import { useAuthStore } from '../store/authStore';
import Loading from '../components/loading';
export default function MentorRoutes() {
    var _a, _b, _c, _d, _e, _f;
    const { user } = useAuthStore();
    if (!((_b = (_a = user === null || user === void 0 ? void 0 : user.user) === null || _a === void 0 ? void 0 : _a.role) === null || _b === void 0 ? void 0 : _b.includes('mentor')) &&
        !((_d = (_c = user === null || user === void 0 ? void 0 : user.user) === null || _c === void 0 ? void 0 : _c.role) === null || _d === void 0 ? void 0 : _d.includes('mentorAssistant')) &&
        !((_f = (_e = user === null || user === void 0 ? void 0 : user.user) === null || _e === void 0 ? void 0 : _e.role) === null || _f === void 0 ? void 0 : _f.includes('admin'))) {
        return React.createElement("div", null,
            React.createElement(Loading, null),
            "NOT AUTHORIZE");
    }
    return (React.createElement(React.Fragment, null,
        React.createElement(Routes, null,
            React.createElement(Route, { path: "/group", element: React.createElement(Groups, null) }),
            React.createElement(Route, { path: "/group/:groupId", element: React.createElement(MentorGroup, null) }))));
}
