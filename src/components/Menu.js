import React, { useState, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Tooltip,
    tooltipClasses,
} from "@mui/material";

import dishesData from "../data/dishes";
import { Link } from "react-router-dom";
import toastSuccess from "../help/help.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "@emotion/styled";

const catagories = {
    Appetizers: 1,
    "Main Courses": 2,
    Desserts: 3,
    Beverages: 4,
    Specials: 5,
};

const Menu = () => {
    const [category, setCategory] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredDishes, setFilteredDishes] = useState([]);
    const [dietary, setDietary] = useState([]);

    useEffect(() => {
        const category_id = catagories[category];
        const filtered = dishesData.dishes.filter((dish) => {
            const categoryMatch =
                category === "" || dish.category_id === category_id;
            const searchTermMatch =
                searchTerm === "" ||
                dish.name.toLowerCase().includes(searchTerm.toLowerCase());
            const dietaryTagMatch =
                dietary.length === 0 ||
                dietary.every((filter) => dish.dietary_tags.includes(filter));
            return categoryMatch && searchTermMatch && dietaryTagMatch;
        });

        setFilteredDishes(filtered);
    }, [category, searchTerm, dietary]);

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
        toast.success(
            `You select ${event.target.value} category`,
            toastSuccess
        );
    };

    const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleDietaryChange = (event) => {
        const selectedFilters = event.target.value;
        setDietary(selectedFilters);
        toast.success(`You select ${event.target.value} dietary`, toastSuccess);
    };

    const allDietaryTags = Array.from(
        new Set(dishesData.dishes.flatMap((dish) => dish.dietary_tags))
    );

    const LightTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} />
    ))(() => ({
        [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: "#f2f3f5",
            color: "black",
            boxShadow: 4,
            fontSize: 18,
        },
    }));

    return (
        <div className="container mx-auto py-8 ">
            {/* <div className="flex sm:justify-between md:flex-col gap-10 items-center mb-2 px-2"> */}
            <div className="grid px-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 items-center justify-center gap-2 md:gap-20 mb-4">
                <FormControl variant="standard" className="w-full sm:w-auto">
                    <InputLabel id="category-label">Category</InputLabel>
                    <Select
                        labelId="category-label"
                        id="category-select"
                        value={category}
                        onChange={handleCategoryChange}
                        label="Category"
                    >
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value="Appetizers">Appetizers</MenuItem>
                        <MenuItem value="Main Courses">Main Courses</MenuItem>
                        <MenuItem value="Desserts">Desserts</MenuItem>
                        <MenuItem value="Beverages">Beverages</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    id="search"
                    label="Search by name"
                    variant="standard"
                    value={searchTerm}
                    onChange={handleSearchTermChange}
                    className="w-full"
                />
                <FormControl className="w-full sm:w-auto" variant="standard">
                    <InputLabel id="dietary-filter-label">
                        Dietary Tags
                    </InputLabel>
                    <Select
                        labelId="dietary-filter-label"
                        id="dietary-filter-select"
                        multiple
                        value={dietary}
                        onChange={handleDietaryChange}
                        label="Dietary Tags"
                    >
                        {allDietaryTags.map((tag) => (
                            <MenuItem key={tag} value={tag}>
                                {tag}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
            <h2 className=" text-orange-700 text-3xl font-bold text-center md:mb-6 mb-2">
                All Dishes
            </h2>
            <div className="grid p-2 grid-cols-1 lg:grid-cols-4 md:grid-cols-3 gap-4">
                {filteredDishes.map((dish) => (
                    <Link to={`/dish/${dish.id}`} key={dish.id}>
                        {" "}
                        <div className=" p-4 rounded shadow-md hover:shadow-lg">
                            <LightTooltip
                                title={dish.dietary_tags.join(", ")}
                                placement="bottom"
                            >
                                <div>
                                    <LazyLoadImage
                                        src={`./images/${dish.image}`}
                                        alt={dish.name}
                                        className="w-full h-40 object-fill mb-4"
                                    />
                                </div>
                            </LightTooltip>
                            <h2 className="text-lg font-semibold">
                                {dish.name}
                            </h2>
                            <p className="text-gray-600 mb-2">
                                {`${dish.description.slice(0, 20)}...`}
                            </p>
                            <p className="font-semibold">
                                Price: ${dish.price}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </div>
    );
};

export default Menu;
