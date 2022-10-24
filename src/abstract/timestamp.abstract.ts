import { CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";

export default abstract class Timestamp {
    @CreateDateColumn()
    createdDate: Date;
    
    @UpdateDateColumn()
    updatedDate: Date;
    
    @DeleteDateColumn()
    deletedDate: Date;
}
