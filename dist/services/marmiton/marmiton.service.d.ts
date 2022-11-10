import { RecipeDto } from '../../dto/recipe.dto';
export declare class MarmitonService {
    getRecipesUrls(title: string): Promise<string[]>;
    getRecipe(title: string, url: string): Promise<RecipeDto>;
    private parseIngredients;
    private parseUnit;
}
