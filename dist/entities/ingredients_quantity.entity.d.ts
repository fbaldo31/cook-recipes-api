import Timestamp from '../abstract/timestamp.abstract';
import { Ingredient } from './ingredient.entity';
import { Recipe } from './recipe.entity';
import { Unit } from './unit.entity';
export declare class IngredientsQuantity extends Timestamp {
    id: number;
    ingredient: Ingredient;
    quantity?: number;
    unit: Unit;
    recipe: Recipe;
}
