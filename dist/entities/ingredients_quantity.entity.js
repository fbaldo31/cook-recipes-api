"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IngredientsQuantity = void 0;
const typeorm_1 = require("typeorm");
const timestamp_abstract_1 = require("../abstract/timestamp.abstract");
const ingredient_entity_1 = require("./ingredient.entity");
const recipe_entity_1 = require("./recipe.entity");
const unit_entity_1 = require("./unit.entity");
let IngredientsQuantity = class IngredientsQuantity extends timestamp_abstract_1.default {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], IngredientsQuantity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ingredient_entity_1.Ingredient, (i) => i.ingredientsQuantity, {
        eager: true,
        nullable: false,
        cascade: ['insert'],
    }),
    __metadata("design:type", ingredient_entity_1.Ingredient)
], IngredientsQuantity.prototype, "ingredient", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'real' }),
    __metadata("design:type", Number)
], IngredientsQuantity.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => unit_entity_1.Unit, (unit) => unit.ingredientsQuantity, {
        eager: true,
        nullable: false,
    }),
    __metadata("design:type", unit_entity_1.Unit)
], IngredientsQuantity.prototype, "unit", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => recipe_entity_1.Recipe, (recipe) => recipe.ingredients, { nullable: false }),
    __metadata("design:type", recipe_entity_1.Recipe)
], IngredientsQuantity.prototype, "recipe", void 0);
IngredientsQuantity = __decorate([
    (0, typeorm_1.Entity)()
], IngredientsQuantity);
exports.IngredientsQuantity = IngredientsQuantity;
//# sourceMappingURL=ingredients_quantity.entity.js.map