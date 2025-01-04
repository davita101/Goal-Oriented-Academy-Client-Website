import React from 'react';
import loading from "../assets/loading.png";
export default function Loading({ className }) {
    return (React.createElement("div", { className: `flex flex-col justify-center items-center bg-opacity-90 z-50 w-full h-full ${className}` },
        React.createElement("img", { src: loading, alt: "Giga chad head photo", width: 50, className: ' top-0 bottom-0 right-0 animate-spin z-[99]' }),
        React.createElement("p", null, "loading...")));
}