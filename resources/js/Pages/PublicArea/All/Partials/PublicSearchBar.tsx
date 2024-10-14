import React, { useState } from "react";
import { IoSearch, IoClose } from "react-icons/io5";

interface SearchBarProps {
    onClick: () => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    searchTerm: string;
}

export default function PublicSearchBar({
    onClick,
    onChange,
    searchTerm,
}: SearchBarProps) {
    const [showCancel, setShowCancel] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e);
        setShowCancel(!!e.target.value);
    };

    const handleCancel = () => {
        onChange({
            target: { value: "" },
        } as React.ChangeEvent<HTMLInputElement>);
        setShowCancel(false);
    };

    return (
        <>
            <div className="relative w-full max-w-md sm:max-w-lg flex ring shadow-xl rounded-lg">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <IoSearch className="text-gray-400" />
                </div>
                <input
                    className="block w-full h-12 sm:h-14 pl-10 pr-10 text-sm sm:text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                    type="search"
                    placeholder="Search for courses or teachers..."
                    value={searchTerm}
                    onChange={handleInputChange}
                />

                {showCancel && (
                    <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 focus:outline-none"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                )}
            </div>

            {/* <button
                type="button"
                className="text-white right-2.5 h-14 w-36 bottom-2.5 ml-4 bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-sm rounded-lg text-sm px-5"
                onClick={onClick}
            >
                Search
            </button> */}
        </>
    );
}
