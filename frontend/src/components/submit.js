import { RefreshCcw } from 'lucide-react';
import React from 'react';
export default function Submit() {
    return (React.createElement(React.Fragment, null,
        React.createElement("p", { className: 'flex items-center justify-center gap-2' },
            "Submitting ",
            React.createElement(RefreshCcw, { className: 'animate-spin' }))));
}
