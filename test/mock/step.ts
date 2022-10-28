import { Step } from '../../src/entities/step.entity';
import { recipeTest } from './recipe';

export const stepTest: Step = {
  id: 1,
  position: 0,
  text: 'This is a test step',
  createdDate: new Date(),
  updatedDate: new Date(),
  deletedDate: null,
  recipe: recipeTest,
};
