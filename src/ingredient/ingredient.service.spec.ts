import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Ingredient } from '../entities/ingredient.entity';
import { repositoryMockFactory } from '../../test/utils';
import { IngredientService } from './ingredient.service';
import { ingredientTest } from '../../test/mock/ingredient';

describe('IngredientService', () => {
  let service: IngredientService;
  let mockIngredientRepo: Repository<Ingredient>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IngredientService,
        { provide: getRepositoryToken(Ingredient), useFactory: repositoryMockFactory },
      ],
    }).compile();

    service = module.get<IngredientService>(IngredientService);
    mockIngredientRepo = module.get(getRepositoryToken(Ingredient));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should getIngredientsNames', async () => {
    const expected = [ingredientTest.name];
    jest.spyOn(mockIngredientRepo, 'find').mockResolvedValue([ingredientTest])
    expect(await service.getIngredientsNames()).toEqual(expected);
  });
});
