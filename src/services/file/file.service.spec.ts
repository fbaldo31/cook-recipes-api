import { Test, TestingModule } from '@nestjs/testing';
import { join } from 'path';

import { FileService } from './file.service';

describe('FileService', () => {
  let service: FileService;
  const testImage = 'test.jpg';
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
    const buf = Buffer.from([0, 0, 0, 0]);
    try {
      const stream = await FileService.saveFile(testFolder, testImage, buf);
      expect(stream.bytesWritten).toBeGreaterThanOrEqual(0);
    } catch (error) {
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
