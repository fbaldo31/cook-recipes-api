import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";

import Timestamp from "../abstract/timestamp.abstract";
import { IngredientsQuantity } from "./ingredients_quantity.entity";

@Entity()
export class Unit extends Timestamp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  label: string;

  @Column({ unique: true })
  slug: string;

  @ManyToMany(type => IngredientsQuantity)
  ingredientsQuantity: IngredientsQuantity;
}
