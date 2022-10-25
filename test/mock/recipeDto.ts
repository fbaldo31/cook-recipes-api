import { Difficulty } from "../../src/constants";
import { RecipeDto } from "../../src/dto/recipe.dto";

export const recipeDtoTest: RecipeDto = {
    title: "test",
    difficulty: Difficulty.EASY,
    preparationTime: 1,
    cookingTime: 20,
    ingredients: [
      {
        name: "Ingredient test",
        quantity: 1,
        unit: "gramme"
      }
    ],
    steps: [
      {
        position: 1,
        text: "Etape test"
      }
    ]
};
