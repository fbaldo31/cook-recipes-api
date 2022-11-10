"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const path_1 = require("path");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const recipe_module_1 = require("./recipe/recipe.module");
const file_service_1 = require("./services/file/file.service");
const ingredient_module_1 = require("./ingredient/ingredient.module");
const marmiton_service_1 = require("./services/marmiton/marmiton.service");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: (0, path_1.join)(__dirname, '..', '.env'),
                isGlobal: true,
                cache: true,
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => ({
                    type: 'postgres',
                    host: configService.get('DATABASE_HOST'),
                    port: +configService.get('DATABASE_PORT'),
                    username: configService.get('DATABASE_USER'),
                    password: configService.get('DATABASE_PASSWORD'),
                    database: configService.get('DATABASE_NAME'),
                    schema: configService.get('DATABASE_SCHEMA'),
                    entities: [__dirname + '/entities/*.entity{.ts,.js}'],
                    synchronize: configService.get('NOVE_ENV') === 'production' ? false : true,
                    cache: true,
                }),
                inject: [config_1.ConfigService],
            }),
            recipe_module_1.RecipeModule,
            ingredient_module_1.IngredientModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, file_service_1.FileService, marmiton_service_1.MarmitonService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map