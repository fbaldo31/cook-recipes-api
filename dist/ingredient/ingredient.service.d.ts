import { Repository } from 'typeorm';
import { Ingredient } from '../entities/ingredient.entity';
export declare class IngredientService {
    private ingredientRepo;
    constructor(ingredientRepo: Repository<Ingredient>);
    getIngredientsNames(): Promise<string[]>;
}
