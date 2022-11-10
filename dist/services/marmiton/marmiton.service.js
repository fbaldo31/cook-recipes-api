"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarmitonService = void 0;
const common_1 = require("@nestjs/common");
const marmiton_api_1 = require("marmiton-api");
const constants_1 = require("../../constants");
let MarmitonService = class MarmitonService {
    async getRecipesUrls(title) {
        const qb = new marmiton_api_1.MarmitonQueryBuilder();
        const query = qb.withTitleContaining(title).build();
        const res = await (0, marmiton_api_1.searchRecipes)(query);
        if (!res.length) {
            return [];
        }
        return res.map((e) => e.url);
    }
    async getRecipe(title, url) {
        const qb = new marmiton_api_1.MarmitonQueryBuilder();
        const query = qb.withTitleContaining(title).build();
        const res = await (0, marmiton_api_1.searchRecipes)(query);
        if (!res.length) {
            return {};
        }
        const recipe = res.find((e) => e.url === url);
        if (!recipe) {
            return {};
        }
        return {
            title: recipe.name,
            preparationTime: recipe.prepTime,
            cookingTime: recipe.totalTime - recipe.prepTime,
            difficulty: constants_1.Difficulty[recipe.difficulty] || constants_1.Difficulty.EASY,
            ingredients: recipe.ingredients.map((e) => this.parseIngredients(e)),
            steps: recipe.steps.map((e, i) => ({ position: i + 1, text: e })),
        };
    }
    parseIngredients(input) {
        try {
            const words = input.split(' ');
            const qty = words[0];
            let quantity;
            if (isNaN(+qty)) {
                if (qty.includes('/')) {
                    quantity = +qty.split('/')[0] / +qty.split('/')[1];
                }
            }
            else {
                quantity = +qty;
            }
            if (words.length === 2) {
                return {
                    name: words[1],
                    quantity,
                    unit: constants_1.Units.pièce,
                };
            }
            const u = words[1];
            const unit = !quantity ? constants_1.Units['un peu'] : this.parseUnit(u);
            let name = words.slice(3).join(' ');
            if (name === '') {
                name = words.slice(2).join(' ');
            }
            if (!quantity) {
                name = words.join(' ');
            }
            return { name, unit, quantity };
        }
        catch (error) {
            common_1.Logger.error('Unable to parse ingredient: ' + input + ' resaon: ' + error.message, 'MarmitonService');
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    parseUnit(input) {
        if (constants_1.Units[input]) {
            return constants_1.Units[input];
        }
        else if (Object.values(constants_1.Units).includes(input.toLowerCase())) {
            return input.toLowerCase();
        }
        else {
            common_1.Logger.log(input);
            return constants_1.Units.pièce;
        }
    }
};
MarmitonService = __decorate([
    (0, common_1.Injectable)()
], MarmitonService);
exports.MarmitonService = MarmitonService;
//# sourceMappingURL=marmiton.service.js.map