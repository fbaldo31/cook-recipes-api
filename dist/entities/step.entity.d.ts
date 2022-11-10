import Timestamp from '../abstract/timestamp.abstract';
import { Recipe } from './recipe.entity';
export declare class Step extends Timestamp {
    id: number;
    position: number;
    text: string;
    recipe: Recipe;
}
