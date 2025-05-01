import { RecipePreview } from "./recipe-preview.model";

export interface Recipe extends RecipePreview {
    area: string;
    instructions: string;
    tags: string | null;
    youtube: string;
    ingredients: {
        name: string;
        measure: string;
    }[];
  };