import React, { useState } from "react";
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    FormGroup,
    FormControlLabel,
    Checkbox,
} from "@mui/material";
import dishesData from "../data/dishes";
import { Link } from "react-router-dom";
const catagories = {
    Appetizers: 1,
    "Main Courses": 2,
    Desserts: 3,
    Beverages: 4,
    Specials: 5,
};

const Menu2 = () => {
    const [category, setCategory] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [dietaryFilters, setDietaryFilters] = useState([]);

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleDietaryFilterChange = (event) => {
        const selectedFilters = event.target.value;
        setDietaryFilters(selectedFilters);
    };

    const filteredDishes = dishesData.dishes.filter((dish) => {
        const category_id = catagories[category];

        const categoryMatch =
            category === "" || dish.category_id === category_id;
        const searchTermMatch =
            searchTerm === "" ||
            dish.name.toLowerCase().includes(searchTerm.toLowerCase());
        const dietaryTagMatch =
            dietaryFilters.length === 0 ||
            dietaryFilters.every((filter) =>
                dish.dietary_tags.includes(filter)
            );
        return categoryMatch && searchTermMatch && dietaryTagMatch;
    });

    const allDietaryTags = Array.from(
        new Set(dishesData.dishes.flatMap((dish) => dish.dietary_tags))
    );

    return (
        <div className="container mx-auto py-8">
            <div className="flex justify-between items-center mb-4">
                <FormControl variant="outlined" className="w-1/4">
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
                    label="Search"
                    variant="outlined"
                    value={searchTerm}
                    onChange={handleSearchTermChange}
                    className="w-1/4 ml-4"
                />
                <FormControl className="w-1/4 ml-4">
                    <InputLabel id="dietary-filter-label">
                        Dietary Tags
                    </InputLabel>
                    <Select
                        labelId="dietary-filter-label"
                        id="dietary-filter-select"
                        multiple
                        value={dietaryFilters}
                        onChange={handleDietaryFilterChange}
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

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filteredDishes.map((dish) => (
                    <Link to={`/dish/${dish.id}`}>
                        <div
                            className="bg-white p-4 rounded shadow"
                            key={dish.id}
                        >
                            <img
                                src={`./images/${dish.image}`}
                                alt={dish.name}
                                className="w-full h-40 object-cover mb-4"
                            />
                            <h2 className="text-lg font-semibold">
                                {dish.name}
                            </h2>
                            <p className="text-gray-600 mb-2">
                                {dish.description}
                            </p>
                            <p className="font-semibold">
                                Price: ${dish.price}
                            </p>
                            <FormGroup row>
                                {dish.dietary_tags.map((tag) => (
                                    <FormControlLabel
                                        key={tag}
                                        control={
                                            <Checkbox
                                                checked={dietaryFilters.includes(
                                                    tag
                                                )}
                                            />
                                        }
                                        label={tag}
                                    />
                                ))}
                            </FormGroup>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Menu2;
