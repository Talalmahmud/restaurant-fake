import React from "react";
import { ScaleLoader } from "react-spinners";
const LoadingSpinner = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <ScaleLoader color="#36d7b7" />
        </div>
    );
};

export default LoadingSpinner;
