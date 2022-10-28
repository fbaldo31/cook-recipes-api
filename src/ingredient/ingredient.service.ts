import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Ingredient } from '../entities/ingredient.entity';

@Injectable()
export class IngredientService {
  constructor(
    @InjectRepository(Ingredient)
    private ingredientRepo: Repository<Ingredient>,
  ) {}

  async getIngredientsNames(): Promise<string[]> {
    const res = await this.ingredientRepo.find({ select: ['name'] });
    if (!res.length) {
      return [];
    }
    return res.map((e) => e.name);
  }
}
