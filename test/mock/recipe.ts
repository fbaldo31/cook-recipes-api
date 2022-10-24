import { Difficulty } from "../../src/constants";
import { Recipe } from "../../src/entities/recipe.entity";

export const recipeTest: Recipe = {
    id: 0,
    title: 'test', // Don't change (used to match test folder !!)
    ingredients: [],
    steps: [],
    preparationTime: 1,
    cookingTime: 1,
    difficulty: Difficulty.EASY,
    createdDate: new Date(),
    updatedDate: new Date(),
    deletedDate: null,
    photos: [],
};
