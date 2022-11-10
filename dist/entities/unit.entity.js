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
exports.Unit = void 0;
const typeorm_1 = require("typeorm");
const timestamp_abstract_1 = require("../abstract/timestamp.abstract");
const ingredients_quantity_entity_1 = require("./ingredients_quantity.entity");
let Unit = class Unit extends timestamp_abstract_1.default {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Unit.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Unit.prototype, "label", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Unit.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ingredients_quantity_entity_1.IngredientsQuantity, (i) => i.unit),
    __metadata("design:type", ingredients_quantity_entity_1.IngredientsQuantity)
], Unit.prototype, "ingredientsQuantity", void 0);
Unit = __decorate([
    (0, typeorm_1.Entity)()
], Unit);
exports.Unit = Unit;
//# sourceMappingURL=unit.entity.js.map