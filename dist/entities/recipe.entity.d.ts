import { Difficulty } from '../constants';
import Timestamp from '../abstract/timestamp.abstract';
import { IngredientsQuantity } from './ingredients_quantity.entity';
import { Photo } from './photo.entity';
import { Step } from './step.entity';
export declare class Recipe extends Timestamp {
    id: number;
    title: string;
    preparationTime: number;
    cookingTime: number;
    difficulty: Difficulty;
    ingredients: IngredientsQuantity[];
    steps: Step[];
    photos?: Photo[];
}
