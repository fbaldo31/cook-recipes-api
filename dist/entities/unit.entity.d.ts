import Timestamp from '../abstract/timestamp.abstract';
import { IngredientsQuantity } from './ingredients_quantity.entity';
export declare class Unit extends Timestamp {
    id: number;
    label: string;
    slug: string;
    ingredientsQuantity: IngredientsQuantity;
}
