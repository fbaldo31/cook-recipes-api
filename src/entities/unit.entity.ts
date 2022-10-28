import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import Timestamp from '../abstract/timestamp.abstract';
import { IngredientsQuantity } from './ingredients_quantity.entity';

@Entity()
export class Unit extends Timestamp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  label: string;

  @Column({ unique: true })
  slug: string;

  @OneToMany(() => IngredientsQuantity, (i) => i.unit)
  ingredientsQuantity: IngredientsQuantity;
}
