/// <reference types="multer" />
import { MarmitonService } from '../services/marmiton/marmiton.service';
import { RecipeDto } from '../dto/recipe.dto';
import { Recipe } from '../entities/recipe.entity';
import { RecipeService } from './recipe.service';
import { IngredientsQuantity } from '../entities/ingredients_quantity.entity';
import { Step } from '../entities/step.entity';
export declare class RecipeController {
    private service;
    private marmiton;
    constructor(service: RecipeService, marmiton: MarmitonService);
    getMarmitonRecipesUrls(title: string): Promise<string[]>;
    getMarmitonRecipe(title: string, url: string): Promise<RecipeDto>;
    getAll(): Promise<Recipe[]>;
    getOneById(id: string): Promise<Recipe>;
    create(recipe: RecipeDto): Promise<Recipe>;
    delete(id: string): Promise<Recipe>;
    removeIngredient(id: string): Promise<IngredientsQuantity>;
    removeStep(id: string): Promise<Step>;
    addPhoto(photos: Array<Express.Multer.File>, id: string): Promise<any>;
}
