/// <reference types="multer" />
import { EntityManager, Repository } from 'typeorm';
import { IngredientsQuantity } from '../entities/ingredients_quantity.entity';
import { Photo } from '../entities/photo.entity';
import { Step } from '../entities/step.entity';
import { Recipe } from '../entities/recipe.entity';
import { Ingredient } from '../entities/ingredient.entity';
import { Unit } from '../entities/unit.entity';
import { RecipeDto } from '../dto/recipe.dto';
export declare class RecipeService {
    private readonly repo;
    private readonly ingredientsQuantityRepo;
    private readonly ingredientsRepo;
    private readonly unitsRepo;
    private readonly stepRepo;
    private readonly photoRepo;
    constructor(repo: Repository<Recipe>, ingredientsQuantityRepo: Repository<IngredientsQuantity>, ingredientsRepo: Repository<Ingredient>, unitsRepo: Repository<Unit>, stepRepo: Repository<Step>, photoRepo: Repository<Photo>);
    findAll(): Promise<Recipe[]>;
    findOne(id: number): Promise<Recipe>;
    create(recipeDto: RecipeDto): Promise<Recipe>;
    createIngredient(name: string, em: EntityManager): Promise<Ingredient>;
    createUnit(input: string, em: EntityManager): Promise<Unit>;
    addPhoto(recipeId: number, data: Express.Multer.File[]): Promise<any>;
    delete(id: number): Promise<Recipe>;
    removeIngredient(ingredientQuantityId: number): Promise<IngredientsQuantity>;
    removeStep(stepId: number): Promise<Step>;
}
