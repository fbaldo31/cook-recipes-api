import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecipeModule } from './recipe/recipe.module';
import { FileService } from './services/file/file.service';
import { IngredientModule } from './ingredient/ingredient.module';
import { MarmitonService } from './services/marmiton/marmiton.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: join(__dirname, '..', '.env'),
      isGlobal: true,
      cache: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST'),
        port: +configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        schema: configService.get('DATABASE_SCHEMA'),
        entities: [__dirname + '/entities/*.entity{.ts,.js}'],
        synchronize:
          configService.get('NOVE_ENV') === 'production' ? false : true,
        cache: true,
      }),
      inject: [ConfigService],
    }),
    RecipeModule,
    IngredientModule,
  ],
  controllers: [AppController],
  providers: [AppService, FileService, MarmitonService],
})
export class AppModule {}
