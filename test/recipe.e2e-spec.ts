import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RecipeModule } from './../src/recipe/recipe.module';
import { recipeTest } from './mock/recipe';
import { recipeDtoTest } from './mock/recipeDto';
import { photoTest } from './mock/photo';

describe('RecipeController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({cache: true,}),
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: (configService: ConfigService) => ({
            type: 'postgres',
            host: configService.get('DATABASE_HOST'),
            port: +configService.get('DATABASE_PORT'),
            username: configService.get('DATABASE_USER'),
            password: configService.get('DATABASE_PASSWORD'),
            database: configService.get('DATABASE_NAME'),
            schema: 'test',
            entities: [__dirname + '/../src/entities/*.entity{.ts,.js}'],
            synchronize: configService.get('NOVE_ENV') === 'producion' ? false : true,
            cache: false,
          }),
          inject: [ConfigService],
        }),
        RecipeModule
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/recipe (POST)', () => {
    return request(app.getHttpServer())
      .post('/recipe/')
      .send(recipeDtoTest)
      .expect(201)
      .then((res: any) => {
        console.log('post', res.body);
        
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('title');
        expect(res.body).toHaveProperty('preparationTime');
        expect(res.body).toHaveProperty('cookingTime');
        expect(res.body).toHaveProperty('difficulty');
        expect(res.body).toHaveProperty('ingredients');
        expect(res.body).toHaveProperty('steps');
      });
  });

  it('/recipe (GET)', () => {
    return request(app.getHttpServer())
      .get('/recipe')
      .expect(200)
      .then((res: any) => {
        expect(res.body).toHaveLength(1);
        expect(res.body[0]).toHaveProperty('id');
        expect(res.body[0]).toHaveProperty('title');
        expect(res.body[0]).toHaveProperty('preparationTime');
        expect(res.body[0]).toHaveProperty('cookingTime');
        expect(res.body[0]).toHaveProperty('difficulty');
        expect(res.body[0]).toHaveProperty('ingredients');
        expect(res.body[0]).toHaveProperty('steps');
      });
  });

  it('/recipe/1 (GET)', () => {
    return request(app.getHttpServer())
      .get('/recipe/1')
      .expect(200)
      .then((res: any) => {
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('title');
        expect(res.body).toHaveProperty('preparationTime');
        expect(res.body).toHaveProperty('cookingTime');
        expect(res.body).toHaveProperty('difficulty');
        expect(res.body).toHaveProperty('ingredients');
        expect(res.body).toHaveProperty('steps');
      });
  });

  it('/recipe/1/photo (POST)', () => {
    return request(app.getHttpServer())
      .post('/recipe/1/photo')
      .attach('photos', Buffer.from([1,1,1]), 'test.test.jpg')
      .expect(201)
      .expect({}); /** @todo Fix it */
  });
});
