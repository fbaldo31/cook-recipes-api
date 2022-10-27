import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import {join} from 'path';
import {pipeline, Readable, } from 'stream';
import {createWriteStream, WriteStream, promises} from 'fs';
const unlink = promises.unlink;
const readdir = promises.readdir;

@Injectable()
export class FileService {

    static async saveFile(recipeName: string, fileName: string, data: Buffer): Promise<WriteStream> {
        return new Promise((resolve, reject) => {
            let write = createWriteStream(join(recipeName, fileName), {autoClose: true});
            const stream = pipeline(
                Readable.from(data),
                write,
                () => Logger.log(`Photo ${fileName} saved successfully.`),
            );
            stream
                .on('error', (error) => {
                    Logger.error(error.message, 'FileService');
                    throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
                })
                .on('close', () => {
                    Logger.log(`Photo ${fileName} saved successfully.`);
                    resolve(stream);
                });
        });
    }

    static async deleteFile(recipeName: string, fileName: string): Promise<void> {
        try {
            await unlink(join(recipeName, fileName));
            const hasRemainingFiles = (await readdir(recipeName)).length !== 0;
            if (!hasRemainingFiles) {
                await unlink(recipeName);
            }
        } catch (error) {
            Logger.error(error.message, 'FileService');
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
