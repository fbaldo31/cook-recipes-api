import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import Timestamp from '../abstract/timestamp.abstract';
import { Ingredient } from './ingredient.entity';
import { Recipe } from './recipe.entity';
import { Unit } from './unit.entity';

@Entity()
export class IngredientsQuantity extends Timestamp {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Ingredient, (i) => i.ingredientsQuantity, {
    eager: true,
    cascade: ['insert'],
  })
  ingredient: Ingredient;

  @Column({ type: 'smallint' })
  quantity?: number;

  @ManyToOne(() => Unit, (unit) => unit.ingredientsQuantity, {
    eager: true,
    cascade: ['insert'],
  })
  unit: Unit;

  @ManyToOne(() => Recipe, (recipe) => recipe.ingredients)
  recipe: Recipe;
}
