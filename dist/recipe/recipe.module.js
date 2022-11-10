"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const step_entity_1 = require("../entities/step.entity");
const ingredient_entity_1 = require("../entities/ingredient.entity");
const ingredients_quantity_entity_1 = require("../entities/ingredients_quantity.entity");
const recipe_entity_1 = require("../entities/recipe.entity");
const unit_entity_1 = require("../entities/unit.entity");
const recipe_controller_1 = require("./recipe.controller");
const recipe_service_1 = require("./recipe.service");
const photo_entity_1 = require("../entities/photo.entity");
const marmiton_service_1 = require("../services/marmiton/marmiton.service");
let RecipeModule = class RecipeModule {
};
RecipeModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                recipe_entity_1.Recipe,
                ingredient_entity_1.Ingredient,
                ingredients_quantity_entity_1.IngredientsQuantity,
                unit_entity_1.Unit,
                step_entity_1.Step,
                photo_entity_1.Photo,
            ]),
        ],
        controllers: [recipe_controller_1.RecipeController],
        providers: [recipe_service_1.RecipeService, marmiton_service_1.MarmitonService],
    })
], RecipeModule);
exports.RecipeModule = RecipeModule;
//# sourceMappingURL=recipe.module.js.map