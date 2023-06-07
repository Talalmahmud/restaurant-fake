// import React, { memo } from "react";
// import { useParams } from "react-router-dom";
// import dishesData from "../data/dishes";

// const DishDetails = () => {
//     const { id } = useParams();
//     const dish = dishesData.dishes.find((dish) => dish.id === parseInt(id));

//     if (!dish) {
//         return <p className="text-lg">Dish not found.</p>;
//     }

//     return (
//         <div className="container mx-auto py-8">
//             <div className="max-w-md mx-auto bg-white rounded p-8 shadow">
//                 <div className="w-100 h-70 mb-4">
//                     <img
//                         src={`${process.env.PUBLIC_URL}/images/${dish.image}`}
//                         alt=""
//                         className="h-full w-full rounded"
//                     />
//                 </div>
//                 <h2 className="text-2xl font-semibold mb-4">{dish.name}</h2>
//                 <p className="text-gray-600 mb-2">{dish.description}</p>
//                 <p className="font-semibold mb-2">Price: ${dish.price}</p>
//                 <p className="text-gray-600 mb-2">
//                     Ingredients: {dish.ingredients}
//                 </p>
//                 <p className="text-gray-600">
//                     Preparation Time: {dish.preparation_time}
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default memo(DishDetails);

import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import dishesData from "../data/dishes";
import LoadingSpinner from "./Spinner";

const DishDetails = () => {
    const { id } = useParams();
    // const dish = dishesData.dishes.find((dish) => dish.id === parseInt(id));
    const [isLoading, setIsLoading] = useState(true);
    const [dish, setDish] = useState(null);

    useEffect(() => {
        // Simulating an asynchronous data fetch
        setTimeout(() => {
            const fetchedDish = dishesData.dishes.find(
                (item) => item.id === parseInt(id)
            );
            setDish(fetchedDish);
            setIsLoading(false);
        }, 2000); // Simulating a 2-second delay
    }, [id]);

    if (isLoading) {
        return <LoadingSpinner />;
    }
    return (
        <div className="p-2 md:p-4 flex gap-2 md:gap-20 flex-col md:flex-row">
            <div className="w-full md:w-[70%] md:h-[350px] h-[200px] mb-4">
                <img
                    src={`${process.env.PUBLIC_URL}/images/${dish.image}`}
                    alt=""
                    className="h-full w-full rounded"
                />
            </div>
            <div>
                <Typography
                    variant="h6"
                    component="h2"
                    className="text-2xl font-semibold mb-4"
                >
                    {dish.name}
                </Typography>
                <Typography variant="body1" className="text-gray-600 mb-2">
                    <span className=" font-bold"> Description:</span>{" "}
                    {dish.description}
                </Typography>
                <Typography variant="body1" className="font-semibold mb-2">
                    <span className=" font-bold"> Price:</span> ${dish.price}
                </Typography>
                <Typography variant="body1" className="text-gray-600 mb-2">
                    <span className=" font-bold"> Ingredients:</span>{" "}
                    {dish.ingredients}
                </Typography>
                <Typography variant="body1" className="text-gray-600">
                    <span className=" font-bold"> Preparation Time:</span>{" "}
                    {dish.preparation_time}
                </Typography>
            </div>
        </div>
    );
};

export default DishDetails;
