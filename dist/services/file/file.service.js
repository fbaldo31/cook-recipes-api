"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileService = void 0;
const common_1 = require("@nestjs/common");
const path_1 = require("path");
const stream_1 = require("stream");
const fs_1 = require("fs");
const unlink = fs_1.promises.unlink;
const readdir = fs_1.promises.readdir;
let FileService = class FileService {
    static async saveFile(recipeName, fileName, data) {
        if (!data) {
            return;
        }
        return new Promise((resolve, reject) => {
            const write = (0, fs_1.createWriteStream)((0, path_1.join)(recipeName, fileName), {
                autoClose: true,
            });
            const stream = (0, stream_1.pipeline)(stream_1.Readable.from(data), write, () => common_1.Logger.log(`Photo ${fileName} saved successfully.`));
            stream
                .on('error', (error) => {
                common_1.Logger.error(error.message, 'FileService');
                reject(error.message);
                throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            })
                .on('close', () => {
                common_1.Logger.log(`Photo ${fileName} saved successfully.`);
                resolve(stream);
            });
        });
    }
    static async deleteFile(recipeName, fileName) {
        try {
            await unlink((0, path_1.join)(recipeName, fileName));
            const hasRemainingFiles = (await readdir(recipeName)).length !== 0;
            if (!hasRemainingFiles) {
                await unlink(recipeName);
            }
        }
        catch (error) {
            common_1.Logger.error(error.message, 'FileService');
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
FileService = __decorate([
    (0, common_1.Injectable)()
], FileService);
exports.FileService = FileService;
//# sourceMappingURL=file.service.js.map