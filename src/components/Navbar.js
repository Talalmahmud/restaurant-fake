import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="bg-gray-900">
            <div className="container mx-auto px-4 py-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-white text-lg font-semibold">
                        <Link to="/">Interactive Menu</Link>
                    </h1>
                    <ul className="flex space-x-4">
                        <li>
                            <Link
                                to="/"
                                className="text-white hover:text-gray-300"
                            >
                                Home
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
