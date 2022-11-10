import { Recipe } from './recipe.entity';
export declare class Photo {
    id: number;
    name: string;
    label: string;
    url: string;
    recipe: Recipe;
    deleteFile(): Promise<void>;
}
