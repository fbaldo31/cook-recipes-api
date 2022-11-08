import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { MarmitonQueryBuilder, Recipe, searchRecipes } from 'marmiton-api';

import { Difficulty, Units } from '../../constants';
import { IngredientsQuantityDto } from '../../dto/ingredientQuantity.dto';
import { RecipeDto } from '../../dto/recipe.dto';

@Injectable()
export class MarmitonService {
  //   constructor() {}

  async getRecipesUrls(title: string): Promise<string[]> {
    const qb = new MarmitonQueryBuilder();
    const query = qb.withTitleContaining(title).build();
    const res = await searchRecipes(query);
    if (!res.length) {
      return [];
    }
    return res.map((e) => e.url);
  }

  async getRecipe(title: string, url: string): Promise<RecipeDto> {
    const qb = new MarmitonQueryBuilder();
    const query = qb.withTitleContaining(title).build();
    const res: Recipe[] = await searchRecipes(query);
    if (!res.length) {
      return {} as RecipeDto;
    }
    const recipe: Recipe = res.find((e) => e.url === url);
    if (!recipe) {
      return {} as RecipeDto;
    }

    return <RecipeDto>{
      title: recipe.name,
      preparationTime: recipe.prepTime,
      cookingTime: recipe.totalTime - recipe.prepTime,
      difficulty: Difficulty[recipe.difficulty] || Difficulty.EASY,
      ingredients: recipe.ingredients.map((e) => this.parseIngredients(e)),
      steps: recipe.steps.map((e, i) => ({ position: i + 1, text: e })),
    };
  }

  private parseIngredients(input: string): IngredientsQuantityDto {
    try {
      const words = input.split(' ');
      const qty = words[0];
      let quantity: number;
      if (isNaN(+qty)) {
        if (qty.includes('/')) {
          quantity = +qty.split('/')[0] / +qty.split('/')[1];
        }
        // Quantity may be not provided by marmiton :/
      } else {
        quantity = +qty;
      }
      if (words.length === 2) {
        // Ex: 1 chou
        return {
          name: words[1],
          quantity,
          unit: Units.pièce,
        };
      }

      const u = words[1];
      const unit = !quantity ? Units['un peu'] : this.parseUnit(u);
      let name = words.slice(3).join(' ');
      if (name === '') {
        name = words.slice(2).join(' ');
      }
      if (!quantity) {
        name = words.join(' ');
      }

      return { name, unit, quantity };
    } catch (error) {
      Logger.error(
        'Unable to parse ingredient: ' + input + ' resaon: ' + error.message,
        'MarmitonService',
      );
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  private parseUnit(input: string | Units): Units {
    if (Units[input]) {
      return Units[input];
    } else if (Object.values(Units).includes(input.toLowerCase() as Units)) {
      return input.toLowerCase() as Units;
    } else {
      Logger.log(input);
      return Units.pièce;
    }
  }
}
