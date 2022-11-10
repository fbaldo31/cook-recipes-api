import Timestamp from '../abstract/timestamp.abstract';
import { IngredientsQuantity } from './ingredients_quantity.entity';
export declare class Ingredient extends Timestamp {
    id: number;
    name: string;
    ingredientsQuantity: IngredientsQuantity[];
}
