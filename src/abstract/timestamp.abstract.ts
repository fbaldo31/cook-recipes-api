import { CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";

export default abstract class Timestamp {
    @CreateDateColumn({select: false})
    createdDate: Date;
    
    @UpdateDateColumn({select: false})
    updatedDate: Date;
    
    @DeleteDateColumn({select: false})
    deletedDate: Date;
}
