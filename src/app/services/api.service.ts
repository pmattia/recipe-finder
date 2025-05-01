import { Injectable } from "@angular/core";
import { environment } from "../../enviroments/environment";
import { ApiRecipe } from "../models/api-recipe.model";
import { ApiResponse } from "../models/api-response.dto";
import { RecipePreview } from "../models/recipe-preview.model";
import { Recipe } from "../models/recipe.model";

@Injectable({
    providedIn: 'root'
})

export class RecipesService {

    async searchRecipe(query: string): Promise<RecipePreview[]> {
        const response = await fetch(`${environment.apiUrl}search.php?s=${query}`);
        if (!response.ok) {
            throw new Error('Failed to fetch recipes');
        }
        const data: ApiResponse<ApiRecipe> = await response.json();
        data.meals = data.meals ?? []; // Handle case where meals is null or undefined
        return data.meals.map((recipe) => {
            return {
                id: recipe.idMeal,
                name: recipe.strMeal,
                thumb: recipe.strMealThumb,
                category: recipe.strCategory
            };
        });
    }

    async getRecipeDetails(id: string): Promise<Recipe> {
        const response = await fetch(`${environment.apiUrl}lookup.php?i=${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch recipe');
        }
        const data: ApiResponse<ApiRecipe> = await response.json();
        if (!data.meals || data.meals.length === 0)
            throw new Error('Failed to fetch recipe');
        else
            return {
                id: data.meals[0].idMeal,
                name: data.meals[0].strMeal,
                thumb: data.meals[0].strMealThumb,
                category: data.meals[0].strCategory,
                area: data.meals[0].strArea,
                instructions: data.meals[0].strInstructions,
                tags: data.meals[0].strTags,
                youtube: data.meals[0].strYoutube,
                ingredients: this.extractIngredients(data.meals[0])
            }
    }

    private extractIngredients(recipe: ApiRecipe): { name: string; measure: string }[] {
        const ingredients = [];
        for (let i = 1; i <= 20; i++) {
            const ingredientName = recipe[`strIngredient${i}` as keyof ApiRecipe];
            const ingredientMeasure = recipe[`strMeasure${i}` as keyof ApiRecipe];
            if (ingredientName && ingredientMeasure) {
                ingredients.push({ name: ingredientName, measure: ingredientMeasure });
            }
        }
        return ingredients;
    }
}