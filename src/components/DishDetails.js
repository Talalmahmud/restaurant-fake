import React, { memo } from "react";
import { useParams } from "react-router-dom";
import dishesData from "../data/dishes";

const DishDetails = () => {
    const { id } = useParams();
    const dish = dishesData.dishes.find((dish) => dish.id === parseInt(id));

    if (!dish) {
        return <p className="text-lg">Dish not found.</p>;
    }

    return (
        <div className="container mx-auto py-8">
            <div className="max-w-md mx-auto bg-white rounded p-8 shadow">
                <div className="w-100 h-70 mb-4">
                    <img
                        src={`${process.env.PUBLIC_URL}/images/${dish.image}`}
                        alt=""
                        className="h-full w-full rounded"
                    />
                </div>
                <h2 className="text-2xl font-semibold mb-4">{dish.name}</h2>
                <p className="text-gray-600 mb-2">{dish.description}</p>
                <p className="font-semibold mb-2">Price: ${dish.price}</p>
                <p className="text-gray-600 mb-2">
                    Ingredients: {dish.ingredients}
                </p>
                <p className="text-gray-600">
                    Preparation Time: {dish.preparation_time}
                </p>
            </div>
        </div>
    );
};

export default memo(DishDetails);
