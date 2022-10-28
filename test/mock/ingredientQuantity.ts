import { IngredientsQuantity } from '../../src/entities/ingredients_quantity.entity';
import { ingredientTest } from './ingredient';
import { recipeTest } from './recipe';
import { unitTest } from './unit';

export const ingredientQtyTest: IngredientsQuantity = {
  id: 1,
  ingredient: ingredientTest,
  unit: unitTest,
  quantity: 1,
  createdDate: new Date(),
  updatedDate: new Date(),
  deletedDate: null,
  recipe: recipeTest,
};
