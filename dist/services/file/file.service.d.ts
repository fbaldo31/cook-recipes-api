/// <reference types="node" />
/// <reference types="node" />
import { WriteStream } from 'fs';
export declare class FileService {
    static saveFile(recipeName: string, fileName: string, data: Buffer): Promise<WriteStream>;
    static deleteFile(recipeName: string, fileName: string): Promise<void>;
}
