import { Step } from "../entities/step.entity";
import { Recipe } from "../entities/recipe.entity";
import { IngredientsQuantityDto } from "./ingredientQuantity.dto";

export interface RecipeDto extends Omit<Recipe, "ingredients"|"steps"|"id"|"createdDate"|"updatedDate"|"deletedDate"> {
    ingredients: IngredientsQuantityDto[];
    steps: Partial<Step>[];
}
