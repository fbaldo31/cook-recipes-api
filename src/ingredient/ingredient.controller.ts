import { Controller, Get } from '@nestjs/common';

import { IngredientService } from './ingredient.service';

@Controller('ingredient')
export class IngredientController {
    constructor(private service: IngredientService) {}

    @Get('/name')
    getNames(): Promise<string[]> {
        return this.service.getIngredientsNames();
    }
}
