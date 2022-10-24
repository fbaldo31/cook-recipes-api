import { Photo } from "../../src/entities/photo.entity";
import { recipeTest } from "./recipe";

export const photoTest: Partial<Photo> = {
    label: "test",
    name: "test.jpg",
    recipe: recipeTest,
    url: "test/test.jpg",
};
