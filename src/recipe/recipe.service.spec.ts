import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { repositoryMockFactory } from '../../test/utils';
import { Recipe } from '../entities/recipe.entity';
import { RecipeService } from './recipe.service';
import { Ingredient } from '../entities/ingredient.entity';
import { IngredientsQuantity } from '../entities/ingredients_quantity.entity';
import { Step } from '../entities/step.entity';
import { Unit } from '../entities/unit.entity';
import { Photo } from '../entities/photo.entity';
import { recipeTest } from '../../test/mock/recipe';
import { recipeDtoTest } from '../../test/mock/recipeDto';
import { unitTest } from '../../test/mock/unit';
import { ingredientTest } from '../../test/mock/ingredient';
import { ingredientQtyTest } from '../../test/mock/ingredientQuantity';
import { photoTest } from '../../test/mock/photo';

describe('RecipeService', () => {
  let service: RecipeService;
  let mockRecipeRepo: Repository<Recipe>;
  let mockIngredientRepo: Repository<Ingredient>;
  let mockUnitRepo: Repository<Unit>;
  let mockIngredientsQuantityRepo: Repository<IngredientsQuantity>;
  let mockPhotoRepo: Repository<Photo>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
      ],
      providers: [
        RecipeService,
        { provide: getRepositoryToken(Recipe), useFactory: repositoryMockFactory },
        { provide: getRepositoryToken(Ingredient), useFactory: repositoryMockFactory },
        { provide: getRepositoryToken(IngredientsQuantity), useFactory: repositoryMockFactory },
        { provide: getRepositoryToken(Step), useFactory: repositoryMockFactory },
        { provide: getRepositoryToken(Unit), useFactory: repositoryMockFactory },
        { provide: getRepositoryToken(Photo), useFactory: repositoryMockFactory },
      ],
    }).compile();

    service = module.get<RecipeService>(RecipeService);
    mockRecipeRepo = module.get(getRepositoryToken(Recipe));
    mockIngredientRepo = module.get(getRepositoryToken(Ingredient));
    mockUnitRepo = module.get(getRepositoryToken(Unit));
    mockIngredientsQuantityRepo = module.get(getRepositoryToken(IngredientsQuantity));
    mockPhotoRepo = module.get(getRepositoryToken(Photo));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should findAll', async () => {
    jest.spyOn(mockRecipeRepo, 'find').mockResolvedValue([recipeTest]);
    expect(await service.findAll()).toEqual([recipeTest]);
  });

  it('should findOne', async () => {
    jest.spyOn(mockRecipeRepo, 'findOne').mockResolvedValue(recipeTest);
    expect(await service.findOne(recipeTest.id)).toEqual(recipeTest);
  });

  it('should create', async () => {
    jest.spyOn(mockUnitRepo, 'create').mockReturnValue(unitTest);
    jest.spyOn(mockIngredientRepo, 'create').mockReturnValue(ingredientTest);
    jest.spyOn(mockIngredientsQuantityRepo, 'create').mockReturnValue(ingredientQtyTest);
    jest.spyOn(mockRecipeRepo, 'save').mockResolvedValue(recipeTest);
    expect(await service.create(recipeDtoTest)).toEqual(recipeTest);
  });

  it('should addPhoto', async () => {
    jest.spyOn(mockRecipeRepo, 'findOne').mockResolvedValue(recipeTest);
    // jest.spyOn(mockPhotoRepo, 'save').mockResolvedValue({
    //   label: photoTest.label,
    //   name: photoTest.name,
    //   url: photoTest.url,
    //   recipe: recipeTest,
    // });
    expect(await service.addPhoto(recipeTest.id, [<any>{filename: 'test.jpg'}])).toEqual([photoTest]);
  });
});
