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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeController = void 0;
const common_1 = require("@nestjs/common");
const marmiton_service_1 = require("../services/marmiton/marmiton.service");
const recipe_service_1 = require("./recipe.service");
let RecipeController = class RecipeController {
    constructor(service, marmiton) {
        this.service = service;
        this.marmiton = marmiton;
    }
    getMarmitonRecipesUrls(title) {
        return this.marmiton.getRecipesUrls(title);
    }
    getMarmitonRecipe(title, url) {
        return this.marmiton.getRecipe(title, url);
    }
    getAll() {
        return this.service.findAll();
    }
    getOneById(id) {
        return this.service.findOne(+id);
    }
    create(recipe) {
        return this.service.create(recipe);
    }
    delete(id) {
        return this.service.delete(+id);
    }
    removeIngredient(id) {
        return this.service.removeIngredient(+id);
    }
    removeStep(id) {
        return this.service.removeStep(+id);
    }
    addPhoto(photos, id) {
        return this.service.addPhoto(+id, Array.isArray(photos) ? photos : photos);
    }
};
__decorate([
    (0, common_1.Get)('marmiton/urls/:title'),
    __param(0, (0, common_1.Param)('title')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RecipeController.prototype, "getMarmitonRecipesUrls", null);
__decorate([
    (0, common_1.Get)('marmiton'),
    __param(0, (0, common_1.Query)('title')),
    __param(1, (0, common_1.Query)('url')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], RecipeController.prototype, "getMarmitonRecipe", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RecipeController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RecipeController.prototype, "getOneById", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RecipeController.prototype, "create", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RecipeController.prototype, "delete", null);
__decorate([
    (0, common_1.Delete)('ingredient/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RecipeController.prototype, "removeIngredient", null);
__decorate([
    (0, common_1.Delete)('step/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RecipeController.prototype, "removeStep", null);
__decorate([
    (0, common_1.Post)('/:id/photo'),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, String]),
    __metadata("design:returntype", void 0)
], RecipeController.prototype, "addPhoto", null);
RecipeController = __decorate([
    (0, common_1.Controller)('recipe'),
    __metadata("design:paramtypes", [recipe_service_1.RecipeService,
        marmiton_service_1.MarmitonService])
], RecipeController);
exports.RecipeController = RecipeController;
//# sourceMappingURL=recipe.controller.js.map