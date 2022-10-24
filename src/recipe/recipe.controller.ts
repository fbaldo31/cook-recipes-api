import { Body, Controller, Get, Param, Post, UploadedFiles } from '@nestjs/common';

import { RecipeDto } from '../dto/recipe.dto';
import { Recipe } from '../entities/recipe.entity';
import { RecipeService } from './recipe.service';

@Controller('recipe')
export class RecipeController {
    constructor(private service: RecipeService) {}

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

    @Post('/:id/photo')
    addPhoto(
        @UploadedFiles() photos: Array<Express.Multer.File>,
        @Param('id') id: string,
    ) {
        return this.service.addPhoto(+id, photos);
    }
}
