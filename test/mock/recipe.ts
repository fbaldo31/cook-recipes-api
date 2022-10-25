import { Difficulty } from "../../src/constants";
import { Recipe } from "../../src/entities/recipe.entity";

export const recipeTest: Recipe = {
    id: 1,
    title: 'test', // Don't change (used to match test folder !!)
    ingredients: [],
    steps: [],
    preparationTime: 1,
    cookingTime: 1,
    difficulty: Difficulty.EASY,
    createdDate: new Date('2022-10-25T04:25:25.404Z'),
    updatedDate: new Date('2022-10-25T04:25:25.404Z'),
    deletedDate: null,
};
