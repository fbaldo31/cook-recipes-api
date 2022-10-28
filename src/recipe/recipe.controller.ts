import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFiles,
} from '@nestjs/common';

import { MarmitonService } from '../services/marmiton/marmiton.service';
import { RecipeDto } from '../dto/recipe.dto';
import { Recipe } from '../entities/recipe.entity';
import { RecipeService } from './recipe.service';

@Controller('recipe')
export class RecipeController {
  constructor(
    private service: RecipeService,
    private marmiton: MarmitonService,
  ) {}

  @Get('marmiton/urls')
  getMarmitonRecipesUrls(@Param('title') title: string): Promise<string[]> {
    return this.marmiton.getRecipesUrls(title);
  }

  @Get('marmiton')
  getMarmitonRecipe(
    @Param('title') title: string,
    @Param('url') url: string,
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

  @Post('/:id/photo')
  addPhoto(
    @UploadedFiles() photos: Array<Express.Multer.File>,
    @Param('id') id: string,
  ) {
    return this.service.addPhoto(+id, Array.isArray(photos) ? photos : photos);
  }
}
