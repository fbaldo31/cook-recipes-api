import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UploadedFiles,
} from '@nestjs/common';

import { MarmitonService } from '../services/marmiton/marmiton.service';
import { RecipeDto } from '../dto/recipe.dto';
import { Recipe } from '../entities/recipe.entity';
import { RecipeService } from './recipe.service';
import { IngredientsQuantity } from '../entities/ingredients_quantity.entity';
import { Step } from '../entities/step.entity';

@Controller('recipe')
export class RecipeController {
  constructor(
    private service: RecipeService,
    private marmiton: MarmitonService,
  ) {}

  @Get('marmiton/urls/:title')
  getMarmitonRecipesUrls(@Param('title') title: string): Promise<string[]> {
    return this.marmiton.getRecipesUrls(title);
  }

  @Get('marmiton')
  getMarmitonRecipe(
    @Query('title') title: string,
    @Query('url') url: string,
  ): Promise<RecipeDto> {
    return this.marmiton.getRecipe(title, url);
  }

  @Get()
  getAll(): Promise<Recipe[]> {
    return this.service.findAll();
  }

  @Get('/:id')
  getOneById(@Param('id') id: string): Promise<Recipe> {
    return this.service.findOne(+id);
  }

  @Post()
  create(@Body() recipe: RecipeDto): Promise<Recipe> {
    return this.service.create(recipe);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<Recipe> {
    return this.service.delete(+id);
  }

  @Delete('ingredient/:id')
  removeIngredient(@Param('id') id: string): Promise<IngredientsQuantity> {
    return this.service.removeIngredient(+id);
  }

  @Delete('step/:id')
  removeStep(@Param('id') id: string): Promise<Step> {
    return this.service.removeStep(+id);
  }

  @Post('/:id/photo')
  addPhoto(
    @UploadedFiles() photos: Array<Express.Multer.File>,
    @Param('id') id: string,
  ) {
    return this.service.addPhoto(+id, Array.isArray(photos) ? photos : photos);
  }
}
