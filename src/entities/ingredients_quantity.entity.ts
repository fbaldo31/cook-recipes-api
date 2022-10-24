import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne, JoinTable } from "typeorm";

import Timestamp from "../abstract/timestamp.abstract";
import { Ingredient } from "./ingredient.entity";
import { Recipe } from "./recipe.entity";
import { Unit } from "./unit.entity";

@Entity()
export class IngredientsQuantity extends Timestamp {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(type => Ingredient, { eager: true, cascade: ['insert'] })
  @JoinTable()
  ingredient: Ingredient;

  @Column({ type: 'smallint' })
  quantity: number;

  @ManyToMany(type => Unit, unit => unit.ingredientsQuantity, { eager: true, cascade: ['insert'] })
  @JoinTable()
  unit: Unit;

  @ManyToOne(type => Recipe, recipe => recipe.ingredients)
  recipe: Recipe
}
