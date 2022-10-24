import { Test, TestingModule } from '@nestjs/testing';
import { readFile } from 'fs/promises';
import { join } from 'path';

import { FileService } from './file.service';

describe('FileService', () => {
  let service: FileService;
  const testImage = 'cookies.svg';
  const filePath = join(__dirname, '..', '..', '..', '..', 'cook-recipes-front', 'src', 'assets', 'images', 'cookies.svg');
  const testFolder = join(__dirname, '..', '..', '..', 'test');
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileService],
    }).compile();

    service = module.get<FileService>(FileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should saveFile', async () => {
    const buf = await readFile(filePath);
    try {
      const stream = await FileService.saveFile(testFolder, testImage, buf);
      // console.log(stream.bytesWritten);
      expect(stream.bytesWritten).toBeGreaterThanOrEqual(10800);
    } catch (error) {
      console.error(error);
      
      expect(error).toBeUndefined();
    }
  });

  it('should deleteFile', async () => {
    let ok: boolean;
    try {
      await FileService.deleteFile(testFolder, testImage);
      ok = true;
    } catch (error) {
      ok = false;
      expect(error).toBeUndefined();
    }
    expect(ok).toBeDefined();
    expect(ok).toBe(true);
  });
});
