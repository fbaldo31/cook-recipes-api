import { Test, TestingModule } from '@nestjs/testing';

import { IngredientController } from './ingredient.controller';
import { IngredientService } from './ingredient.service';

describe('IngredientController', () => {
  let controller: IngredientController;
  const names = ['test'];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IngredientController],
      providers: [
        {
          provide: IngredientService,
          useValue: {
            getIngredientsNames: jest.fn().mockResolvedValue(names),
          }
        }
      ]
    }).compile();

    controller = module.get<IngredientController>(IngredientController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should getNames', async () => {
    expect(await controller.getNames()).toBeDefined();
    expect(await controller.getNames()).toEqual(names);
  });
});
