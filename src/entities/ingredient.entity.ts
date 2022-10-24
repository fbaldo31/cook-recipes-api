import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";

import Timestamp from "../abstract/timestamp.abstract";
import { IngredientsQuantity } from "./ingredients_quantity.entity";

@Entity()
export class Ingredient extends Timestamp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @ManyToMany(type => IngredientsQuantity, ingredientsQuantity => ingredientsQuantity.ingredient)
  ingredientsQuantity: IngredientsQuantity[]
}
