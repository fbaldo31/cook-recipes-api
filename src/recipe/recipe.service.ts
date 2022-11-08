import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { join } from 'path';

import { IngredientsQuantity } from '../entities/ingredients_quantity.entity';
import { Photo } from '../entities/photo.entity';
import { Step } from '../entities/step.entity';
import { FileService } from '../services/file/file.service';
import { Recipe } from '../entities/recipe.entity';
import { Ingredient } from '../entities/ingredient.entity';
import { Unit } from '../entities/unit.entity';
import { RecipeDto } from '../dto/recipe.dto';
import { Units } from '../constants';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(Recipe)
    private readonly repo: Repository<Recipe>,
    @InjectRepository(IngredientsQuantity)
    private readonly ingredientsQuantityRepo: Repository<IngredientsQuantity>,
    @InjectRepository(Ingredient)
    private readonly ingredientsRepo: Repository<Ingredient>,
    @InjectRepository(Unit)
    private readonly unitsRepo: Repository<Unit>,
    @InjectRepository(Step)
    private readonly stepRepo: Repository<Step>,
    @InjectRepository(Photo)
    private readonly photoRepo: Repository<Photo>,
  ) {}

  findAll(): Promise<Recipe[]> {
    return this.repo.find();
  }

  findOne(id: number): Promise<Recipe> {
    return this.repo.findOne({ where: { id } });
  }

  async create(recipeDto: RecipeDto): Promise<Recipe> {
    if (!recipeDto.ingredients?.length) {
      throw new HttpException('No ingredient provided', HttpStatus.BAD_REQUEST);
    }
    if (!recipeDto.steps?.length) {
      throw new HttpException('No step provided', HttpStatus.BAD_REQUEST);
    }

    try {
      let recipe: Recipe;
      await this.repo.manager.transaction(async (em: EntityManager) => {
        // Save recipe
        const entity = new Recipe();
        entity.title = recipeDto.title;
        entity.preparationTime = recipeDto.preparationTime;
        entity.cookingTime = recipeDto.cookingTime;
        entity.difficulty = recipeDto.difficulty;
        recipe = await em.save(entity);
        // Build ingredientsQuantity
        await Promise.all(
          recipeDto.ingredients.map(async (e) => {
            const ingredient = await this.createIngredient(e.name, em);
            const unit = await this.createUnit(e.unit, em);
            const ingredientQuantity = new IngredientsQuantity();
            ingredientQuantity.ingredient = ingredient;
            ingredientQuantity.unit = unit;
            ingredientQuantity.quantity = e.quantity;
            ingredientQuantity.recipe = recipe;
            return em.save(IngredientsQuantity, ingredientQuantity);
          }),
        );

        // Build Steps
        await Promise.all(
          recipeDto.steps.map((e) =>
            em.save(this.stepRepo.create({ ...e, recipe })),
          ),
        );
        Logger.log(
          `New recipe ${recipe.title} created with ${recipeDto.ingredients.length} ingredients and ${recipeDto.steps.length} steps.`,
          'RecipeService.create',
        );
      });
      return this.repo.findOneBy({ id: recipe.id });
    } catch (error) {
      Logger.error(error.stack, 'RecipeService.create');
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /** reate an ingredient if not existing */
  async createIngredient(name: string, em: EntityManager): Promise<Ingredient> {
    const existing = await em.findOneBy(Ingredient, { name });
    if (!existing) {
      const entity = new Ingredient();
      entity.name = name;
      return entity;
    }
    return existing;
  }

  /** Create a Unit if not existing */
  async createUnit(
    input: string = Units.pièce,
    em: EntityManager,
  ): Promise<Unit> {
    const labels = Object.keys(Units);
    const isLabel = !!Units[input];
    const all = await em.find(Unit);
    const existing = all.find((e) => e.slug === input || e.label === input);
    if (!existing) {
      try {
        const entity = new Unit();
        if (isLabel) {
          entity.label = input;
          entity.slug = Units[input];
        } else {
          entity.slug = input;
          entity.label = labels.find((e) => Units[e] === input);
        }
        Logger.log(
          `Save new unit "${entity.label}" "${entity.slug}"`,
          'createUnit',
        );
        return em.save(Unit, entity);
        // return (await em.upsert(Unit, entity, {conflictPaths: ['label', 'slug']})).raw;
      } catch (error) {
        Logger.error(
          `Error while saving new unit ${input}: ${error.message}`,
          'createUnit',
        );
      }
    }
    return existing;
  }

  async addPhoto(recipeId: number, data: Express.Multer.File[]): Promise<any> {
    const recipe = await this.repo.findOne({ where: { id: recipeId } });
    if (!recipe || !data) {
      return;
    }
    return Promise.all(
      data.map((file) => {
        Logger.log(`Save photo ${file.filename}`, 'RecipeService.addPhoto');

        FileService.saveFile(recipe.title, file.filename, file.buffer);
        const photo: Photo = this.photoRepo.create({
          name: file.filename,
          label: file.filename.split('.')[0],
          url: join(recipe.title, file.filename),
          recipe,
        });
        return this.photoRepo.save(photo);
      }),
    );
  }

  async delete(id: number): Promise<Recipe> {
    const recipe = await this.repo.findOne({ where: { id } });
    if (!recipe) {
      return;
    }
    try {
      if (recipe.photos?.length) {
        await this.photoRepo.remove(recipe.photos);
      }
      if (recipe.ingredients?.length) {
        await this.ingredientsQuantityRepo.remove(recipe.ingredients);
      }
      if (recipe.steps?.length) {
        await this.stepRepo.remove(recipe.steps);
      }
      return this.repo.remove(recipe);
    } catch (error) {
      Logger.error(error.message, 'RecipeService.delete');
    }
  }

  async removeIngredient(
    ingredientQuantityId: number,
  ): Promise<IngredientsQuantity> {
    const ingredient = await this.ingredientsQuantityRepo.findOneBy({
      id: ingredientQuantityId,
    });
    if (!ingredient) {
      return;
    }
    return this.ingredientsQuantityRepo.remove(ingredient);
  }

  async removeStep(stepId: number): Promise<Step> {
    const step = await this.stepRepo.findOneBy({ id: stepId });
    if (!step) {
      return;
    }
    return this.stepRepo.remove(step);
  }
}
