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
exports.RecipeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const path_1 = require("path");
const ingredients_quantity_entity_1 = require("../entities/ingredients_quantity.entity");
const photo_entity_1 = require("../entities/photo.entity");
const step_entity_1 = require("../entities/step.entity");
const file_service_1 = require("../services/file/file.service");
const recipe_entity_1 = require("../entities/recipe.entity");
const ingredient_entity_1 = require("../entities/ingredient.entity");
const unit_entity_1 = require("../entities/unit.entity");
const constants_1 = require("../constants");
let RecipeService = class RecipeService {
    constructor(repo, ingredientsQuantityRepo, ingredientsRepo, unitsRepo, stepRepo, photoRepo) {
        this.repo = repo;
        this.ingredientsQuantityRepo = ingredientsQuantityRepo;
        this.ingredientsRepo = ingredientsRepo;
        this.unitsRepo = unitsRepo;
        this.stepRepo = stepRepo;
        this.photoRepo = photoRepo;
    }
    findAll() {
        return this.repo.find();
    }
    findOne(id) {
        return this.repo.findOne({ where: { id } });
    }
    async create(recipeDto) {
        var _a, _b;
        if (!((_a = recipeDto.ingredients) === null || _a === void 0 ? void 0 : _a.length)) {
            throw new common_1.HttpException('No ingredient provided', common_1.HttpStatus.BAD_REQUEST);
        }
        if (!((_b = recipeDto.steps) === null || _b === void 0 ? void 0 : _b.length)) {
            throw new common_1.HttpException('No step provided', common_1.HttpStatus.BAD_REQUEST);
        }
        try {
            let recipe;
            await this.repo.manager.transaction(async (em) => {
                const entity = new recipe_entity_1.Recipe();
                entity.title = recipeDto.title;
                entity.preparationTime = recipeDto.preparationTime;
                entity.cookingTime = recipeDto.cookingTime;
                entity.difficulty = recipeDto.difficulty;
                recipe = await em.save(entity);
                await Promise.all(recipeDto.ingredients.map(async (e) => {
                    const ingredient = await this.createIngredient(e.name, em);
                    const unit = await this.createUnit(e.unit, em);
                    const ingredientQuantity = new ingredients_quantity_entity_1.IngredientsQuantity();
                    ingredientQuantity.ingredient = ingredient;
                    ingredientQuantity.unit = unit;
                    ingredientQuantity.quantity = e.quantity;
                    ingredientQuantity.recipe = recipe;
                    return em.save(ingredients_quantity_entity_1.IngredientsQuantity, ingredientQuantity);
                }));
                await Promise.all(recipeDto.steps.map((e) => em.save(this.stepRepo.create(Object.assign(Object.assign({}, e), { recipe })))));
                common_1.Logger.log(`New recipe ${recipe.title} created with ${recipeDto.ingredients.length} ingredients and ${recipeDto.steps.length} steps.`, 'RecipeService.create');
            });
            return this.repo.findOneBy({ id: recipe.id });
        }
        catch (error) {
            common_1.Logger.error(error.stack, 'RecipeService.create');
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async createIngredient(name, em) {
        const existing = await em.findOneBy(ingredient_entity_1.Ingredient, { name });
        if (!existing) {
            const entity = new ingredient_entity_1.Ingredient();
            entity.name = name;
            return entity;
        }
        return existing;
    }
    async createUnit(input = constants_1.Units.pièce, em) {
        const labels = Object.keys(constants_1.Units);
        const isLabel = !!constants_1.Units[input];
        const all = await em.find(unit_entity_1.Unit);
        const existing = all.find((e) => e.slug === input || e.label === input);
        if (!existing) {
            try {
                const entity = new unit_entity_1.Unit();
                if (isLabel) {
                    entity.label = input;
                    entity.slug = constants_1.Units[input];
                }
                else {
                    entity.slug = input;
                    entity.label = labels.find((e) => constants_1.Units[e] === input);
                }
                common_1.Logger.log(`Save new unit "${entity.label}" "${entity.slug}"`, 'createUnit');
                return em.save(unit_entity_1.Unit, entity);
            }
            catch (error) {
                common_1.Logger.error(`Error while saving new unit ${input}: ${error.message}`, 'createUnit');
            }
        }
        return existing;
    }
    async addPhoto(recipeId, data) {
        const recipe = await this.repo.findOne({ where: { id: recipeId } });
        if (!recipe || !data) {
            return;
        }
        return Promise.all(data.map((file) => {
            common_1.Logger.log(`Save photo ${file.filename}`, 'RecipeService.addPhoto');
            file_service_1.FileService.saveFile(recipe.title, file.filename, file.buffer);
            const photo = this.photoRepo.create({
                name: file.filename,
                label: file.filename.split('.')[0],
                url: (0, path_1.join)(recipe.title, file.filename),
                recipe,
            });
            return this.photoRepo.save(photo);
        }));
    }
    async delete(id) {
        var _a, _b, _c;
        const recipe = await this.repo.findOne({ where: { id } });
        if (!recipe) {
            return;
        }
        try {
            if ((_a = recipe.photos) === null || _a === void 0 ? void 0 : _a.length) {
                await this.photoRepo.remove(recipe.photos);
            }
            if ((_b = recipe.ingredients) === null || _b === void 0 ? void 0 : _b.length) {
                await this.ingredientsQuantityRepo.remove(recipe.ingredients);
            }
            if ((_c = recipe.steps) === null || _c === void 0 ? void 0 : _c.length) {
                await this.stepRepo.remove(recipe.steps);
            }
            return this.repo.remove(recipe);
        }
        catch (error) {
            common_1.Logger.error(error.message, 'RecipeService.delete');
        }
    }
    async removeIngredient(ingredientQuantityId) {
        const ingredient = await this.ingredientsQuantityRepo.findOneBy({
            id: ingredientQuantityId,
        });
        if (!ingredient) {
            return;
        }
        return this.ingredientsQuantityRepo.remove(ingredient);
    }
    async removeStep(stepId) {
        const step = await this.stepRepo.findOneBy({ id: stepId });
        if (!step) {
            return;
        }
        return this.stepRepo.remove(step);
    }
};
RecipeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(recipe_entity_1.Recipe)),
    __param(1, (0, typeorm_1.InjectRepository)(ingredients_quantity_entity_1.IngredientsQuantity)),
    __param(2, (0, typeorm_1.InjectRepository)(ingredient_entity_1.Ingredient)),
    __param(3, (0, typeorm_1.InjectRepository)(unit_entity_1.Unit)),
    __param(4, (0, typeorm_1.InjectRepository)(step_entity_1.Step)),
    __param(5, (0, typeorm_1.InjectRepository)(photo_entity_1.Photo)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], RecipeService);
exports.RecipeService = RecipeService;
//# sourceMappingURL=recipe.service.js.map