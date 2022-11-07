import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { join } from 'path';

import { IngredientsQuantity } from '../entities/ingredients_quantity.entity';
import { Photo } from '../entities/photo.entity';
import { Step } from '../entities/step.entity';
import { FileService } from '../services/file/file.service';
import { Recipe } from '../entities/recipe.entity';
import { Ingredient } from '../entities/ingredient.entity';
import { Unit } from '../entities/unit.entity';
import { UNITS } from '../constants';
import { RecipeDto } from '../dto/recipe.dto';

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
      // Save recipe
      const recipe = await this.repo.save(
        this.repo.create({
          title: recipeDto.title,
          preparationTime: recipeDto.preparationTime,
          cookingTime: recipeDto.cookingTime,
          difficulty: recipeDto.difficulty,
        }),
      );
      // Build ingredientsQuantity
      await Promise.all(
        recipeDto.ingredients.map(async (e) => {
          const ingredient = await this.createIngredient(e.name);
          const unit = await this.createUnit(e.unit);
          return this.ingredientsQuantityRepo.save({
            ingredient,
            quantity: e.quantity,
            unit,
            recipe,
          });
        }),
      );

      // Build Steps
      await Promise.all(
        recipeDto.steps.map((e) =>
          this.stepRepo.save(this.stepRepo.create({ ...e, recipe })),
        ),
      );
      Logger.log(
        `New recipe ${recipe.title} created with ${recipeDto.ingredients.length} ingredients and ${recipeDto.steps.length} steps.`,
        'RecipeService.create',
      );
      return this.repo.findOneBy({ id: recipe.id });
    } catch (error) {
      Logger.error(error.message, 'RecipeService.create');
    }
  }

  /** reate an ingredient if not existing */
  async createIngredient(name: string): Promise<Ingredient> {
    const existing = await this.ingredientsRepo.findOneBy({ name });
    if (!existing) {
      return this.ingredientsRepo.save(this.ingredientsRepo.create({ name }));
    }
    return existing;
  }

  /** Create a Unit if not existing */
  async createUnit(label: string): Promise<Unit> {
    const existing = await this.unitsRepo.findOneBy({ label });
    if (!existing) {
      return this.unitsRepo.save(
        this.unitsRepo.create({ label, slug: UNITS[label] }),
      );
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
    return this.ingredientsQuantityRepo.remove(ingredient);
  }

  async removeStep(stepId: number): Promise<Step> {
    const step = await this.stepRepo.findOneBy({ id: stepId });
    return this.stepRepo.remove(step);
  }
}
