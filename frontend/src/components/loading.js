import React from 'react';
import loading from "../assets/loading.png";
export default function Loading() {
    return (React.createElement("div", { className: 'flex justify-center items-center bg-opacity-90 z-50 w-full h-full' },
        React.createElement("img", { src: loading, alt: "Giga chad head photo", width: 50, className: ' top-0 bottom-0 right-0 animate-spin z-[99]' })));
}
