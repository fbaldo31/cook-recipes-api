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
    dto = {
        "title": "Recette test",
        "difficulty": "Facile",
        "preparationTime": "1",
        "cookingTime": "20",
        "ingredients": [
            {
                "name": "Ingredient test",
                "quantity": "1",
                "unit": "gramme"
            }
        ],
        "steps": [
            {
                "position": "1",
                "text": "Etape test"
            }
        ]
    }
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

    findAll() {
        return this.repo.find();
    }

    findOne(id: number) {
        return this.repo.findOne({ where: {id}});
    }

    async create(recipeDto: RecipeDto) {
        if (!recipeDto.ingredients?.length) {
            throw new HttpException('No ingredient provided', HttpStatus.BAD_REQUEST);
        }
        if (!recipeDto.steps?.length) {
            throw new HttpException('No step provided', HttpStatus.BAD_REQUEST);
        }

        try {
            const recipe = await this.repo.save(this.repo.create({
                title: recipeDto.title,
                preparationTime: recipeDto.preparationTime,
                cookingTime: recipeDto.cookingTime,
                difficulty: recipeDto.difficulty,
            }));
            const promises: Promise<any>[] = [
                // Build ingredientsQuantity
                ...recipeDto.ingredients.map(async e => {
                    const ingredient = await this.createIngredient(e.name);
                    const unit = await this.createUnit(e.unit);
                    return this.ingredientsQuantityRepo.save({
                        ingredient,
                        quantity: e.quantity,
                        unit,
                        recipe
                    });
                }),
                // Build Steps
                ...recipeDto.steps.map(e => this.stepRepo.save(this.stepRepo.create({...e, recipe}))),
            ];
            // Save relations
            await Promise.all(promises);
            // Save recipe
            return this.repo.findOneBy({id: recipe.id});
        } catch (error) {
            Logger.error(error.message, 'RecipeService.create');
        }
    }

    /** reate an ingredient if not existing */
    async createIngredient(name: string): Promise<Ingredient> {
        const existing = await this.ingredientsRepo.findOneBy({name});
        if (!existing) {
            return this.ingredientsRepo.save(this.ingredientsRepo.create({name}));
        }
        return existing;
    }

    /** Create a Unit if not existing */
    async createUnit(label: string): Promise<Unit> {
        const existing = await this.unitsRepo.findOneBy({label});
        if (!existing) {
            return this.unitsRepo.save(this.unitsRepo.create({label, slug: UNITS[label]}));
        }
        return existing;
    }

    async addPhoto(recipeId: number, data: Express.Multer.File[]): Promise<any> {
        const recipe = await this.repo.findOne({where: {id: recipeId}});
        if (!recipe || !data) {
            return;
        }
        return Promise.all(data.map(file => {
            Logger.log(`Save photo ${file.filename}`, 'RecipeService.addPhoto');

            FileService.saveFile(recipe.title, file.filename, file.buffer);
            const photo: Photo = this.photoRepo.create({
                name: file.filename,
                label: file.filename.split('.')[0],
                url: join(recipe.title, file.filename),
                recipe,
            });
            return this.photoRepo.save(photo);
        }));
    }
}
