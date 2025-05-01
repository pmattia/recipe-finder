import { ApiRecipe } from "./api-recipe.model";
import { ApiResponse } from "./api-response.dto";
import { RecipePreview } from "./recipe-preview.model";
import { Recipe } from "./recipe.model";

export const API_EMPTY_RESPONSE_MOCK: ApiResponse<any> = {
    meals: null
};

export const API_RECIPES_MOCK: ApiResponse<ApiRecipe> = {
    meals: [
        {
            idMeal: "52770",
            strMeal: "Spaghetti Bolognese",
            strMealAlternate: null,
            strCategory: "Beef",
            strArea: "Italian",
            strInstructions: `Put the onion and oil in a large pan and fry over a fairly high heat for 3-4 mins. Add the garlic and mince and fry until they both brown. Add the mushrooms and herbs, and cook for another couple of mins.
  
  Stir in the tomatoes, beef stock, tomato ketchup or purée, Worcestershire sauce and seasoning. Bring to the boil, then reduce the heat, cover and simmer, stirring occasionally, for 30 mins.
  
  Meanwhile, cook the spaghetti in a large pan of boiling, salted water, according to packet instructions. Drain well, run hot water through it, put it back in the pan and add a dash of olive oil, if you like, then stir in the meat sauce. Serve in hot bowls and hand round Parmesan cheese, for sprinkling on top.`,
            strMealThumb: "https://www.themealdb.com/images/media/meals/sutysw1468247559.jpg",
            strTags: "Pasta,Meat",
            strYoutube: "https://www.youtube.com/watch?v=-gF8d-fitkU",
            strIngredient1: "onions",
            strIngredient2: "olive oil",
            strIngredient3: "garlic",
            strIngredient4: "lean minced beef",
            strIngredient5: "mushrooms",
            strIngredient6: "dried oregano",
            strIngredient7: "tomatoes",
            strIngredient8: "hot beef stock",
            strIngredient9: "tomato puree",
            strIngredient10: "worcestershire sauce",
            strIngredient11: "spaghetti",
            strIngredient12: "parmesan",
            strIngredient13: null,
            strIngredient14: null,
            strIngredient15: null,
            strIngredient16: null,
            strIngredient17: null,
            strIngredient18: null,
            strIngredient19: null,
            strIngredient20: null,
            strMeasure1: "2",
            strMeasure2: "1 tbsp",
            strMeasure3: "1 clove",
            strMeasure4: "500g",
            strMeasure5: "90g",
            strMeasure6: "1 tsp",
            strMeasure7: "400g can",
            strMeasure8: "300ml",
            strMeasure9: "1 tbsp",
            strMeasure10: "1 tbsp",
            strMeasure11: "350g",
            strMeasure12: "Topping",
            strMeasure13: "",
            strMeasure14: "",
            strMeasure15: "",
            strMeasure16: null,
            strMeasure17: null,
            strMeasure18: null,
            strMeasure19: null,
            strMeasure20: null,
            strSource: null,
            strImageSource: null,
            strCreativeCommonsConfirmed: null,
            dateModified: null,
        },
        {
            idMeal: "52982",
            strMeal: "Spaghetti alla Carbonara",
            strMealAlternate: null,
            strCategory: "Pasta",
            strArea: "Italian",
            strInstructions: `STEP 1
  Put a large saucepan of water on to boil.
  
  STEP 2
  Finely chop the 100g pancetta, having first removed any rind. Finely grate 50g pecorino cheese and 50g parmesan and mix them together.
  
  STEP 3
  Beat the 3 large eggs in a medium bowl and season with a little freshly grated black pepper. Set everything aside.
  
  STEP 4
  Add 1 tsp salt to the boiling water, add 350g spaghetti and when the water comes back to the boil, cook at a constant simmer, covered, for 10 minutes or until al dente (just cooked).
  
  STEP 5
  Squash 2 peeled plump garlic cloves with the blade of a knife, just to bruise it.
  
  STEP 6
  While the spaghetti is cooking, fry the pancetta with the garlic. Drop 50g unsalted butter into a large frying pan or wok and, as soon as the butter has melted, tip in the pancetta and garlic.
  
  STEP 7
  Leave to cook on a medium heat for about 5 minutes, stirring often, until the pancetta is golden and crisp. The garlic has now imparted its flavour, so take it out with a slotted spoon and discard.
  
  STEP 8
  Keep the heat under the pancetta on low. When the pasta is ready, lift it from the water with a pasta fork or tongs and put it in the frying pan with the pancetta. Don’t worry if a little water drops in the pan as well (you want this to happen) and don’t throw the pasta water away yet.
  
  STEP 9
  Mix most of the cheese in with the eggs, keeping a small handful back for sprinkling over later.
  
  STEP 10
  Take the pan of spaghetti and pancetta off the heat. Now quickly pour in the eggs and cheese. Using the tongs or a long fork, lift up the spaghetti so it mixes easily with the egg mixture, which thickens but doesn’t scramble, and everything is coated.
  
  STEP 11
  Add extra pasta cooking water to keep it saucy (several tablespoons should do it). You don’t want it wet, just moist. Season with a little salt, if needed.
  
  STEP 12
  Use a long-pronged fork to twist the pasta on to the serving plate or bowl. Serve immediately with a little sprinkling of the remaining cheese and a grating of black pepper. If the dish does get a little dry before serving, splash in some more hot pasta water and the glossy sauciness will be revived.`,
            strMealThumb: "https://www.themealdb.com/images/media/meals/llcbn01574260722.jpg",
            strTags: "Pasta,BBQ,Breakfast",
            strYoutube: "https://www.youtube.com/watch?v=_T6jkRvhlkk",
            strIngredient1: "Spaghetti",
            strIngredient2: "Egg Yolks",
            strIngredient3: "Salt",
            strIngredient4: "Bacon",
            strIngredient5: "Pecorino",
            strIngredient6: "Black Pepper",
            strIngredient7: "",
            strIngredient8: "",
            strIngredient9: "",
            strIngredient10: "",
            strIngredient11: "",
            strIngredient12: "",
            strIngredient13: "",
            strIngredient14: "",
            strIngredient15: "",
            strIngredient16: "",
            strIngredient17: "",
            strIngredient18: "",
            strIngredient19: "",
            strIngredient20: "",
            strMeasure1: "320g",
            strMeasure2: "6",
            strMeasure3: "As required",
            strMeasure4: "150g",
            strMeasure5: "50g",
            strMeasure6: "As required",
            strMeasure7: "",
            strMeasure8: "",
            strMeasure9: "",
            strMeasure10: "",
            strMeasure11: "",
            strMeasure12: "",
            strMeasure13: "",
            strMeasure14: "",
            strMeasure15: "",
            strMeasure16: "",
            strMeasure17: "",
            strMeasure18: "",
            strMeasure19: "",
            strMeasure20: "",
            strSource: "https://www.bbcgoodfood.com/recipes/ultimate-spaghetti-carbonara-recipe",
            strImageSource: null,
            strCreativeCommonsConfirmed: null,
            dateModified: null,
        },
    ],
};
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

export const API_RECIPE_DETAILS_MOCK: ApiResponse<ApiRecipe> = {
    "meals": [
        {
            "idMeal": "52772",
            "strMeal": "Teriyaki Chicken Casserole",
            "strMealAlternate": null,
            "strCategory": "Chicken",
            "strArea": "Japanese",
            "strInstructions": "Preheat oven to 350° F. Spray a 9x13-inch baking pan with non-stick spray.\r\nCombine soy sauce, ½ cup water, brown sugar, ginger and garlic in a small saucepan and cover. Bring to a boil over medium heat. Remove lid and cook for one minute once boiling.\r\nMeanwhile, stir together the corn starch and 2 tablespoons of water in a separate dish until smooth. Once sauce is boiling, add mixture to the saucepan and stir to combine. Cook until the sauce starts to thicken then remove from heat.\r\nPlace the chicken breasts in the prepared pan. Pour one cup of the sauce over top of chicken. Place chicken in oven and bake 35 minutes or until cooked through. Remove from oven and shred chicken in the dish using two forks.\r\n*Meanwhile, steam or cook the vegetables according to package directions.\r\nAdd the cooked vegetables and rice to the casserole dish with the chicken. Add most of the remaining sauce, reserving a bit to drizzle over the top when serving. Gently toss everything together in the casserole dish until combined. Return to oven and cook 15 minutes. Remove from oven and let stand 5 minutes before serving. Drizzle each serving with remaining sauce. Enjoy!",
            "strMealThumb": "https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg",
            "strTags": "Meat,Casserole",
            "strYoutube": "https://www.youtube.com/watch?v=4aZr5hZXP_s",
            "strIngredient1": "soy sauce",
            "strIngredient2": "water",
            "strIngredient3": "brown sugar",
            "strIngredient4": "ground ginger",
            "strIngredient5": "minced garlic",
            "strIngredient6": "cornstarch",
            "strIngredient7": "chicken breasts",
            "strIngredient8": "stir-fry vegetables",
            "strIngredient9": "brown rice",
            "strIngredient10": "",
            "strIngredient11": "",
            "strIngredient12": "",
            "strIngredient13": "",
            "strIngredient14": "",
            "strIngredient15": "",
            "strIngredient16": null,
            "strIngredient17": null,
            "strIngredient18": null,
            "strIngredient19": null,
            "strIngredient20": null,
            "strMeasure1": "3/4 cup",
            "strMeasure2": "1/2 cup",
            "strMeasure3": "1/4 cup",
            "strMeasure4": "1/2 teaspoon",
            "strMeasure5": "1/2 teaspoon",
            "strMeasure6": "4 Tablespoons",
            "strMeasure7": "2",
            "strMeasure8": "1 (12 oz.)",
            "strMeasure9": "3 cups",
            "strMeasure10": "",
            "strMeasure11": "",
            "strMeasure12": "",
            "strMeasure13": "",
            "strMeasure14": "",
            "strMeasure15": "",
            "strMeasure16": null,
            "strMeasure17": null,
            "strMeasure18": null,
            "strMeasure19": null,
            "strMeasure20": null,
            "strSource": null,
            "strImageSource": null,
            "strCreativeCommonsConfirmed": null,
            "dateModified": null
        }
    ]
};

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