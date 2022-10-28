import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import Timestamp from '../abstract/timestamp.abstract';
import { IngredientsQuantity } from './ingredients_quantity.entity';

@Entity()
export class Ingredient extends Timestamp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(
    () => IngredientsQuantity,
    (ingredientsQuantity) => ingredientsQuantity.ingredient,
  )
  ingredientsQuantity: IngredientsQuantity[];
}
