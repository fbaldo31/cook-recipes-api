import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import Timestamp from '../abstract/timestamp.abstract';
import { Recipe } from './recipe.entity';

@Entity()
export class Step extends Timestamp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  position: number;

  @Column({ type: 'text' })
  text: string;

  @ManyToOne(() => Recipe, (recipe) => recipe.ingredients)
  recipe: Recipe;
}
