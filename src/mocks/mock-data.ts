import { RecipePreview } from "../app/models/recipe-preview.model";
import { Recipe } from "../app/models/recipe.model";


export const RECIPES_PREVIEW_MOCK: RecipePreview[] =
    [
        {
            id: "52770",
            name: "Spaghetti Bolognese",
            category: "Beef",
            thumb: "https://www.themealdb.com/images/media/meals/sutysw1468247559.jpg",
        },
        {
            id: "52982",
            name: "Spaghetti alla Carbonara",
            category: "Pasta",
            thumb: "https://www.themealdb.com/images/media/meals/llcbn01574260722.jpg",
        }
    ];

export const RECIPE_DETAILS_MOCK: Recipe = {
    id: "52772",
    name: "Teriyaki Chicken Casserole",
    category: "Chicken",
    area: "Japanese",
    instructions: "Preheat oven to 350° F. Spray a 9x13-inch baking pan with non-stick spray.\r\nCombine soy sauce, ½ cup water, brown sugar, ginger and garlic in a small saucepan and cover. Bring to a boil over medium heat. Remove lid and cook for one minute once boiling.\r\nMeanwhile, stir together the corn starch and 2 tablespoons of water in a separate dish until smooth. Once sauce is boiling, add mixture to the saucepan and stir to combine. Cook until the sauce starts to thicken then remove from heat.\r\nPlace the chicken breasts in the prepared pan. Pour one cup of the sauce over top of chicken. Place chicken in oven and bake 35 minutes or until cooked through. Remove from oven and shred chicken in the dish using two forks.\r\n*Meanwhile, steam or cook the vegetables according to package directions.\r\nAdd the cooked vegetables and rice to the casserole dish with the chicken. Add most of the remaining sauce, reserving a bit to drizzle over the top when serving. Gently toss everything together in the casserole dish until combined. Return to oven and cook 15 minutes. Remove from oven and let stand 5 minutes before serving. Drizzle each serving with remaining sauce. Enjoy!",
    thumb: "https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg",
    tags: "Meat,Casserole",
    youtube: "https://www.youtube.com/watch?v=4aZr5hZXP_s",
    ingredients: [
        { name: "soy sauce", measure: "3/4 cup" },
        { name: "water", measure: "1/2 cup" },
        { name: "brown sugar", measure: "1/4 cup" },
        { name: "ground ginger", measure: "1/2 teaspoon" },
        { name: "minced garlic", measure: "1/2 teaspoon" },
        { name: "cornstarch", measure: "4 Tablespoons" },
        { name: "chicken breasts", measure: "2" },
        { name: "stir-fry vegetables", measure: "1 (12 oz.)" },
        { name: "brown rice", measure: "3 cups" }
    ]
};