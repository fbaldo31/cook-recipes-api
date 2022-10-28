import { Test, TestingModule } from '@nestjs/testing';
import * as marmiton from 'marmiton-api';
import { MarmitonService } from './marmiton.service';

describe('MarmitonService', () => {
  let service: MarmitonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MarmitonService],
    }).compile();

    service = module.get<MarmitonService>(MarmitonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should getRecipesUrls', async () => {
    const expected = ['http://test'];
    jest
      .spyOn(marmiton, 'searchRecipes')
      .mockResolvedValue([{ url: 'http://test' } as marmiton.Recipe]);
    expect(await service.getRecipesUrls('test')).toEqual(expected);
  });

  it('should getRecipesUrls', async () => {
    expect(
      await service.getRecipe(
        'Sucettes',
        'https://www.marmiton.org/recettes/recette_sucettes-aux-fromages-rapes_194274.aspx',
      ),
    ).toBeDefined();
  });
});
