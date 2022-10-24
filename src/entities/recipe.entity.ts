import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

import { Difficulty } from "../constants";
import Timestamp from "../abstract/timestamp.abstract";
import { IngredientsQuantity } from "./ingredients_quantity.entity";
import { Photo } from "./photo.entity";
import { Step } from "./step.entity";

@Entity()
export class Recipe extends Timestamp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'smallint' })
  preparationTime: number;

  @Column({ type: 'smallint' })
  cookingTime: number;

  @Column()
  difficulty: Difficulty;

  @OneToMany(type => IngredientsQuantity, ingredients => ingredients.recipe)
  ingredients: IngredientsQuantity[];

  @OneToMany(type => Step, step => step.recipe)
  steps: Step[];

  @OneToMany(type => Photo, photo => photo.recipe)
  photos?: Photo[];
}
