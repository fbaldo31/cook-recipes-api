import { Test, TestingModule } from '@nestjs/testing';
import { join } from 'path';

import { Photo } from '../entities/photo.entity';
import { Difficulty } from '../constants';
import { Recipe } from '../entities/recipe.entity';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';
import { recipeDtoTest } from '../../test/mock/recipeDto';

const recipeTest: Recipe = {
  id: 0,
  title: 'Test',
  ingredients: [],
  steps: [],
  preparationTime: 1,
  cookingTime: 1,
  difficulty: Difficulty.EASY,
  createdDate: new Date(),
  updatedDate: new Date(),
  deletedDate: null,
  photos: [],
};

const photoTest: Partial<Photo> = {
  id: 0,
  name: 'test.jpg',
  label: 'test',
  url: join(recipeTest.title, 'test'),
  recipe: recipeTest,
};

describe('RecipeController', () => {
  let controller: RecipeController;
  let service: RecipeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecipeController],
      providers: [
        { 
          provide: RecipeService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            addPhoto: jest.fn(),
          }
        }
      ],
    })
    .compile();

    controller = module.get<RecipeController>(RecipeController);
    service = await module.resolve<RecipeService>(RecipeService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should getAll', async () => {
    const expectedResult = [recipeTest];
    jest.spyOn(service, 'findAll').mockResolvedValue(expectedResult);
    expect(await controller.getAll()).toEqual(expectedResult);
  });

  it('should getOneById', async () => {
    const expectedResult = recipeTest;
    jest.spyOn(service, 'findOne').mockResolvedValue(expectedResult);
    expect(await controller.getOneById(`${recipeTest.id}`)).toEqual(expectedResult);
  });

  it('should create', async () => {
    const expectedResult = recipeTest;
    jest.spyOn(service, 'create').mockResolvedValue(expectedResult);
    expect(await controller.create(recipeDtoTest)).toEqual(expectedResult);
  });

  it('should addPhoto', async () => {
    const expectedResult = photoTest;
    jest.spyOn(service, 'addPhoto').mockResolvedValue(expectedResult);
    expect(await controller.addPhoto([<any>{filename: 'test.jpg', buffer: Buffer.from([1,1,1,1])}], `${recipeTest.id}`)).toEqual(expectedResult);
  });
});
