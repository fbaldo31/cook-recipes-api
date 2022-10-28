import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Step } from '../entities/step.entity';
import { Ingredient } from '../entities/ingredient.entity';
import { IngredientsQuantity } from '../entities/ingredients_quantity.entity';
import { Recipe } from '../entities/recipe.entity';
import { Unit } from '../entities/unit.entity';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';
import { Photo } from '../entities/photo.entity';
import { MarmitonService } from '../services/marmiton/marmiton.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Recipe,
      Ingredient,
      IngredientsQuantity,
      Unit,
      Step,
      Photo,
    ]),
  ],
  controllers: [RecipeController],
  providers: [RecipeService, MarmitonService],
})
export class RecipeModule {}
