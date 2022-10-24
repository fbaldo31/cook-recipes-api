import { FileService } from "../services/file/file.service";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BeforeInsert, BeforeRemove } from "typeorm"

import { Recipe } from "./recipe.entity"

@Entity()
export class Photo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    label: string;
    
    @Column({ length: 1000 })
    url: string;

    @ManyToOne(() => Recipe, (recipe) => recipe.photos)
    recipe: Recipe;

    @BeforeRemove()
    async deleteFile(): Promise<void> {
        await FileService.deleteFile(this.recipe.title, this.label);
    }
}