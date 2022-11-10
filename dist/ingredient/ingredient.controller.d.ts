import { IngredientService } from './ingredient.service';
export declare class IngredientController {
    private service;
    constructor(service: IngredientService);
    getNames(): Promise<string[]>;
}
