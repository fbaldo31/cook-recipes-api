import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";

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

  @OneToMany(type => IngredientsQuantity, i => i.unit)
  ingredientsQuantity: IngredientsQuantity;
}
