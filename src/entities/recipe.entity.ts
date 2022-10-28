import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { Difficulty } from '../constants';
import Timestamp from '../abstract/timestamp.abstract';
import { IngredientsQuantity } from './ingredients_quantity.entity';
import { Photo } from './photo.entity';
import { Step } from './step.entity';

@Entity()
export class Recipe extends Timestamp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  title: string;

  @Column({ type: 'smallint' })
  preparationTime: number;

  @Column({ type: 'smallint' })
  cookingTime: number;

  @Column()
  difficulty: Difficulty;

  @OneToMany(() => IngredientsQuantity, (ingredients) => ingredients.recipe, {
    eager: true,
  })
  ingredients: IngredientsQuantity[];

  @OneToMany(() => Step, (step) => step.recipe, { eager: true })
  steps: Step[];

  @OneToMany(() => Photo, (photo) => photo.recipe, { eager: true })
  photos?: Photo[];
}
